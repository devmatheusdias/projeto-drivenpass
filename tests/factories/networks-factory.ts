import prisma from "config/database"
import { faker } from "@faker-js/faker"

export async function createNetwork(title: string, network: string, password: string, userId: number ){
    return await prisma.network.create({
        data:{
            title,
            network,
            password,
            userId
        }
    })
}

export async function createRandomNetwork(){
    const title = faker.company.name();
    const network = faker.internet.domainName();
    const password = faker.internet.password();
    const userId = faker.number.int();

    return createNetwork(title, network, password, userId)
}