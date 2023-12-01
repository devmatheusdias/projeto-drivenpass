import prisma from "@/config/database";
import { faker } from "@faker-js/faker"

export async function createUser(email: string, password: string){
    return await prisma.user.create({
        data:{
            email,
            password
        }
    })
}


export async function createRandomBook(){
    const email = faker.internet.email();
    const password = faker.internet.password();

    return createUser(email, password)
}