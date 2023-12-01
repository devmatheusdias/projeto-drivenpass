import prisma from "config/database";
import { faker } from "@faker-js/faker"
import bcrypt from 'bcrypt'


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


export async function createCredentialWithoutId(title?: string, url?: string,
    username?: string, password?: string, userid?: number) {
    
    const icomingPassword = password || faker.internet.password();
    const hashedPassword = await bcrypt.hash(icomingPassword, 12);
  
    return {
      title: title || faker.company.name(),
      url: url || faker.internet.url(),
      username: username || faker.internet.userName(),
      password: hashedPassword,
      userid: userid || faker.number.int()
    };
  }