import { Request, Response } from "express";
import httpStatus from "http-status";
import { Credential } from "@prisma/client";
import { AuthenticatedRequest } from "middlewares";
import { createCredentialService, getAllCredentialsService, getCredentialService, deleteCredentialService } from "services";

export async function createCredentialsController(req: AuthenticatedRequest, res: Response): Promise<Response>{
  const { title, url, username, password } = req.body as Credential;
  const { userId } = req;

  const credential = await createCredentialService(title, url, username, password, userId);

  return res.status(httpStatus.CREATED).json(credential)
}

export async function getAllCredentialsController(req: AuthenticatedRequest, res: Response): Promise<Response>{
    
    const credentials = await getAllCredentialsService();

    return res.status(httpStatus.OK).send(credentials)
}

export async function getCredentialController(req: AuthenticatedRequest, res: Response): Promise<Response>{
    const {id} = req.params;
    const { userId } = req;

    const credential = await getCredentialService(Number(id), userId);
    return res.status(httpStatus.OK).json({credential})
}

export async function deleteCredentialController(req: AuthenticatedRequest, res: Response): Promise<Response>{
    const {id} = req.params;
    const { userId } = req;


    const credential = await deleteCredentialService(Number(id), userId);
    return res.status(httpStatus.OK).json({credential})

}