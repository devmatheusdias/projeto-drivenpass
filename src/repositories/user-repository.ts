import prisma from "@/config/database"
import { User } from "@prisma/client";

async function findByEmail(email: string): Promise<User>{

  return prisma.user.findUnique({
    where:{
      email
    }
  });
}

async function create(email: string, password: string): Promise<User>{
  return prisma.user.create({
   data:{
    email,
    password
   }
  })
}

export const userRepository = {create, findByEmail}