import { Request, Response } from "express";
import httpStatus from "http-status";
import { Credential } from "@prisma/client";
import credentialService from "@/services/credentials-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";

export async function createCredentials(req: Request, res: Response){
  const { title, url, username, password } = req.body as Credential;
//   const { userId } = req;

  const credential = await credentialService.createCredential(title, url, username, password, 5);

  return res.status(httpStatus.CREATED).json({credential})
}

export async function getAllCredentials(req: Request, res: Response){
    
    const credentials = await credentialService.getAllCredentials();

    return res.status(httpStatus.OK).json({credentials})
}