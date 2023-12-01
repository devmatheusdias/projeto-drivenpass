import prisma from "config/database";
import { faker } from "@faker-js/faker"
import bcrypt from 'bcrypt'

export async function createUser(email?: string, password?: string) {
    const icomingPassword = password || faker.internet.password();
    const hashedPassword = await bcrypt.hash(icomingPassword, 12);

    return await prisma.user.create({
        data: {
            email: email || faker.internet.email(),
            password: hashedPassword
        }
    })
}

export async function createUserWithoutId(email?: string, password?: string) {
    const icomingPassword = password || faker.internet.password();
    const hashedPassword = await bcrypt.hash(icomingPassword, 12);

    return {
        email: email || faker.internet.email(),
        password: hashedPassword
    }
}
