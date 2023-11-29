import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "@/errors/duplicate-email-error";
import { userRepository } from "@/repositories/user-repository";

export async function createUser(email: string, password: string): Promise<User>{

  // 2 Se o e-mail já estiver em uso, a aplicação não pode criar a conta
  await validateUniqueEmail(email);

  // 4 a senha precisa ir para o banco criptografada. Bcrypt
  const hashedPassword = await bcrypt.hash(password, 12);

  return userRepository.create(email, hashedPassword);

}

async function validateUniqueEmail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export const userService = {
  createUser,
};
