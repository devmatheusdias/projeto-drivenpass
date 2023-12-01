import prisma from "@/config/database";
import { faker } from "@faker-js/faker"


export async function createCredential(title: string, url: string, username: string, password: string, userId: number ){
    return await prisma.credential.create({
        data:{
            title,
            url,
            username,
            password,
            userId
        }
    })
}

export async function createRandomCredential(){
    const title = faker.company.name();
    const url = faker.internet.url();
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const userId = faker.number.int();

    return createCredential(title, url, username, password, userId)
}