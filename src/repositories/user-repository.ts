import prisma from "config/database";
import { User } from "@prisma/client";

export async function findByEmail(email: string): Promise<User>{

  return prisma.user.findUnique({
    where:{
      email
    }
  });
}

export async function createUser(email: string, password: string): Promise<User>{
  return prisma.user.create({
   data:{
    email,
    password
   }
  })
}
