import prisma from "@/config/database"

async function findByEmail(email: string) {

  return prisma.user.findUnique({
    where:{
      email
    }
  });
}

async function create(email: string, password: string){
  return prisma.user.create({
   data:{
    email,
    password
   }
  })
}

export const userRepository = {create, findByEmail}