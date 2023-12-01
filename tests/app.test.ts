import app from "../src/app"
import supertest from "supertest";
import prisma from "config/database";
import httpStatus from "http-status";
import { createUser, createUserWithoutId } from "./factories/users-factory";
import { createCredentialWithoutId, createCredential } from "./factories/credentials-factory copy";
import { duplicatedEmailError } from "errors";
import { faker } from "@faker-js/faker";
import { generateValidToken } from "./helpers";
import { title } from "process";

const server = supertest(app);

beforeEach(async () => {
    await prisma.credential.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
})

 describe('POST /user', () => {
     describe('when the body is invalid', () => {

         it('should respond with status 400 when body is not given', async () => {
         const response = await server.post('/users');

         expect(response.status).toBe(httpStatus.BAD_REQUEST);
     });

     it('should respond with status 400 when body is not valid', async () => {
         const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

         const response = await server.post('/users').send(invalidBody);

         expect(response.status).toBe(httpStatus.BAD_REQUEST);
       });
     })

     describe('when body is valid', () => {

         const generateValidBody = () => ({
             email: faker.internet.email(),
             password: faker.internet.password(),
         });

         it('should respond with status 409 and not create a user if the email is already in use', async () => {
             const user1 = await createUserWithoutId();
             const user2 = await createUserWithoutId(user1.email);

             await server.post('/users').send(user1);
             const { status } = await server.post("/users").send(user2);
             expect(status).toBe(httpStatus.CONFLICT);
         });

         it('should respond with status 201 and create user when given email is unique', async () => {
             const body = await createUserWithoutId();
             const res = await server.post('/users').send(body);

             expect(res.status).toBe(httpStatus.CREATED);
             expect(res.body).toEqual({
                 id: expect.any(Number),
                 email: expect.any(String),
                 password: expect.any(String)
             })

        });

        it('should respond with status 400 and not create a user if the password is less than 10 characters long', async () => {
            const newUser =  {
                email: faker.internet.email(),
                password: faker.internet.password({length: 8})
            }
            console.log(newUser)

            const res = await server.post('/users') // Substitua '/users' pela rota correta para criar um usuário
                .send(newUser);

            expect(res.status).toBe(httpStatus.BAD_REQUEST);
        });

    });
});

describe('POST /auth/sign-in', () => {
    describe('when the body is invalid', () => {
        const generateValidBody = () => ({
            email: faker.internet.email(),
            password: faker.internet.password(),
        });
        it('should respond with status 400 when body is not given', async () => {
            const response = await server.post('/auth/sign-in');

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
          });

          it('should respond with status 400 when body is not valid', async () => {
            const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

            const response = await server.post('/auth/sign-in').send(invalidBody);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
          });

        describe('when body is valid', () => {
            describe('when body is invalid ', () => {
                it('should respond with status 401 if there is no user for given email', async () => {
                    const body = generateValidBody();

                    const response = await server.post('/auth/sign-in').send(body);

                    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
                });

                it('should respond with status 401 if there is a user for given email but password is not correct', async () => {
                    const body = generateValidBody();
                    await createUser(body.email, body.password);

                    const response = await server.post('/auth/sign-in').send({
                        ...body,
                        password: faker.lorem.word(),
                    });

                    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
                });
            })

            describe('when credentials are valid', () => {
                it('should respond with status 200', async () => {
                  const body = generateValidBody();
                  await createUser(body.email, body.password);

                  const response = await server.post('/auth/sign-in').send(body);

                  expect(response.status).toBe(httpStatus.OK);
                });

                it('should respond with user data', async () => {
                  const body = generateValidBody();
                  const user = await createUser(body.email, body.password);

                  const response = await server.post('/auth/sign-in').send(body);

                  expect(response.body.user).toEqual({
                    id: user.id,
                    email: user.email,
                  });
                });

                it('should respond with session token', async () => {
                  const body = generateValidBody();
                  await createUser(body.email, body.password);

                  const response = await server.post('/auth/sign-in').send(body);

                  expect(response.body.token).toBeDefined();
                });
              });


        });
    });
})

describe('POST /credentials', () => {
    it('deve criar uma credencial com titulo, url, nome de usuario e senha válido', async () => {
        const user = await createUser();
        const token = await generateValidToken(user)
        const credential = await createCredentialWithoutId();

        const res = await server.post('/credentials').set('Authorization', `Bearer ${token}`).send(credential);

        expect(res.status).toBe(httpStatus.CREATED)
        expect(res.body).toEqual({
            id: expect.any(Number),
            title: expect.any(String),
            url: expect.any(String),
            username: expect.any(String),
            password: expect.any(String),
            userId: expect.any(Number)
        })
    })

    it('Não deve criar uma credencial se o título já estiver em uso pelo mesmo usuário', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const credential = createCredentialWithoutId();

        let res = await server.post('/credentials').set('Authorization', `Bearer ${token}`).send(credential);

        res = await server.post('/credentials').set('Authorization', `Bearer ${token}`).send(credential);
        expect(res.status).toBe(400);

    });

})

describe('GET /credentials', () => {
    it('Deve fornecer uma forma de obter todas as credenciais', async () => {

        const user = await createUser();
        const token = await generateValidToken(user);
        const credential1 = await createCredential('title', 'http://google.com', 'matheusdias', '12345678910', user.id);
        const credential2 = await createCredential('title2', 'http://google.com', 'matheusdias', '12345678910', user.id);
        const credential3 = await createCredential('title3', 'http://google.com', 'matheusdias', '12345678910', user.id);

        const credentials = [credential1, credential2, credential3]


        for (let credential of credentials) {
            await server.post('/credentials').set('Authorization', `Bearer ${token}`).send(credential);
        }

        const res = await server.get('/credentials').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    url: expect.any(String),
                    username: expect.any(String),
                    password: expect.any(String),
                    userId: expect.any(Number)
                })
            ])
        )
    });

    it('Deve avisar se o usuário procurar por uma credencial que não é dele ou que não existe', async () => {
        const user = await createUser();
        const user2 = await createUser();

        console.log(user.id)

        const token1 = await generateValidToken(user);
        const token2 = await generateValidToken(user2);

        const credential1 = await createCredential('title', 'http://google.com', 'matheusdias', '12345678910', user.id);


        let res = await server.post('/credentials').set('Authorization', `Bearer ${token1}`).send(credential1);
        console.log(res.body)

    });


})