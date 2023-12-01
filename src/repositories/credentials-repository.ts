import prisma from "config/database";
import { Credential } from "@prisma/client";

export async function findCrendentialByTitle(title: string): Promise<Credential> {

  return prisma.credential.findFirst({
    where:{
      title
    }
  });
}

export async function findCrendentialById(credentialId: number) : Promise<Credential>{

    return prisma.credential.findFirst({
      where:{
        id: credentialId
      }
    });
  }

export async function createCredential(title: string, url: string, username: string, password: string, userId: number) : Promise<Credential>{
    return prisma.credential.create({
        data:{
            title, 
            url,
            username,
            password,
            userId
        }
    })
}

export async function getAllCredentials(): Promise<Credential[]> {
    return prisma.credential.findMany({});
}

export async function getCredential(credentialId: number, userId: number) : Promise<Credential>{
    return prisma.credential.findFirst({
        where:{
            id: credentialId,
            userId: userId
        }
    })
}

export async function deleteCredential(credentialId: number, userId: number) : Promise<Credential>{
    return prisma.credential.delete({
        where:{
            id: credentialId,
            userId
        }
    })
}
