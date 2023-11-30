import prisma from "@/config/database";
import { Credential } from "@prisma/client";

async function findCrendentialByTitle(title: string): Promise<Credential> {

  return prisma.credential.findFirst({
    where:{
      title
    }
  });
}

async function findCrendentialById(credentialId: number) : Promise<Credential>{

    return prisma.credential.findFirst({
      where:{
        id: credentialId
      }
    });
  }

async function createCredential(title: string, url: string, username: string, password: string, userId: number) : Promise<Credential>{
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

async function getAllCredentials(): Promise<Credential[]> {
    return prisma.credential.findMany({});
}

async function getCredential(credentialId: number, userId: number) : Promise<Credential>{
    return prisma.credential.findFirst({
        where:{
            id: credentialId,
            userId: userId
        }
    })
}

async function deleteCredential(credentialId: number, userId: number) : Promise<Credential>{
    return prisma.credential.delete({
        where:{
            id: credentialId,
            userId
        }
    })
}

export const credentialsRepository = { createCredential, findCrendentialByTitle, findCrendentialById, getAllCredentials, getCredential, deleteCredential}