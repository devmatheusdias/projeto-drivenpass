import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { findByEmail, createUser } from "repositories";
import { duplicatedEmailError } from "errors";

export async function createUserService(email: string, password: string): Promise<User>{

  // 2 Se o e-mail já estiver em uso, a aplicação não pode criar a conta
  await validateUniqueEmail(email);

  // 4 a senha precisa ir para o banco criptografada. Bcrypt
  const hashedPassword = await bcrypt.hash(password, 12);

  return createUser(email, hashedPassword);

}

async function validateUniqueEmail(email: string): Promise<void>{
  const userWithSameEmail = await findByEmail(email);
  if (userWithSameEmail) throw duplicatedEmailError();

}

