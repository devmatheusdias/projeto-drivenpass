import { Credential } from "@prisma/client";
import bcrypt from "bcrypt"
import { notFoundError } from "errors/not-found-error";
import { findCrendentialByTitle, findCrendentialById, createCredential, getAllCredentials, getCredential, deleteCredential } from "repositories";
import { ForbiddenError} from "errors";

export async function findByTitle(title: string): Promise<Credential>{
    const titleFound = await findCrendentialByTitle(title);
    return titleFound;
}

export async function findCrendentialByIdService(credentialId: number): Promise<Credential>{
    const titleFound = await findCrendentialById(credentialId);
    return titleFound;
}


export async function createCredentialService(title: string, url: string, username: string, password: string, userId: number): Promise<Credential>{

    const newTitle = await findByTitle(title);

    // Cada credencial deve possuir um título/nome/rótulo único
    // if(newTitle.title === title) throw DuplicatedCredentialError();

    //Por ser um dado sensível, o campo de senha da credencial deve ser criptografado usando um segredo da aplicação.
    const hashedPassword = await bcrypt.hash(password, 12);

    return createCredential(title, url, username, hashedPassword, userId)
}

export async function getAllCredentialsService(): Promise<Credential[]>{

    const credentials = await getAllCredentials();
    if(credentials.length === 0) throw notFoundError();

    return credentials
}

export async function getCredentialService(credentialId: number, userId: number): Promise<Credential>{

    const credential = await getCredential(credentialId, userId);
    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(!credential) throw notFoundError();

    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(credential.userId != userId) throw ForbiddenError();
    
    return credential;
}

export async function deleteCredentialService(credentialId: number, userId: number): Promise<Credential>{

    const credential = await findCrendentialById(credentialId);
    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(!credential) throw notFoundError();

    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(credential.userId != userId) throw ForbiddenError();
    

    await deleteCredential(credential.id, userId);

    return credential;
}
