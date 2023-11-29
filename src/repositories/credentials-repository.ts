import prisma from "@/config/database";

async function findByTitle(title: string) {

    console.log(title)
  return prisma.credential.findFirst({
    where:{
      title
    }
  });
}


async function createCredential(title: string, url: string, username: string, password: string, userId: number) {
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


export const credentialsRepository = { createCredential, findByTitle }