import app from "../src/app"
import supertest from "supertest";
import prisma from "config/database";
import httpStatus from "http-status";
import { createUser, createUserWithoutId } from "./factories/users-factory";
import { duplicatedEmailError } from "errors";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";


const server = supertest(app);

beforeEach(async () => {
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


