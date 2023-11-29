import { Credential } from "@prisma/client";
import bcrypt from "bcrypt"
import { DuplicatedCredentialError } from "@/errors/duplicate-credential-error";
import { credentialsRepository } from "@/repositories/credentials-repository";

export async function findByTitle(title: string){
    const titleFound = await credentialsRepository.findByTitle(title);
    return titleFound;
}

async function createCredential(title: string, url: string, username: string, password: string, userId: number){

    const newTitle = await findByTitle(title);

    //Cada credencial deve possuir um título/nome/rótulo único
    // if(newTitle.title === title) throw DuplicatedCredentialError();

    //Por ser um dado sensível, o campo de senha da credencial deve ser criptografado usando um segredo da aplicação.
    const hashedPassword = await bcrypt.hash(password, 12);

    return credentialsRepository.createCredential(title, url, username, hashedPassword, userId)
}

const credentialService = { findByTitle, createCredential}

export default credentialService;