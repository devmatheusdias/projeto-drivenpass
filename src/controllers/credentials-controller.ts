import { Request, Response } from "express";
import httpStatus from "http-status";
import { Credential } from "@prisma/client";
import credentialService from "@/services/credentials-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";

export async function createCredentials(req: AuthenticatedRequest, res: Response): Promise<Response>{
  const { title, url, username, password } = req.body as Credential;
  const { userId } = req;

  const credential = await credentialService.createCredential(title, url, username, password, userId);

  return res.status(httpStatus.CREATED).json({credential})
}

export async function getAllCredentials(req: AuthenticatedRequest, res: Response): Promise<Response>{
    
    const credentials = await credentialService.getAllCredentials();

    return res.status(httpStatus.OK).json({credentials})
}

export async function getCredential(req: AuthenticatedRequest, res: Response): Promise<Response>{
    const {id} = req.params;
    const { userId } = req;

    const credential = await credentialService.getCredential(Number(id), userId);
    return res.status(httpStatus.OK).json({credential})
}

export async function deleteCredential(req: AuthenticatedRequest, res: Response): Promise<Response>{
    const {id} = req.params;
    const { userId } = req;


    const credential = await credentialService.deleteCredential(Number(id), userId);
    return res.status(httpStatus.OK).json({credential})

}