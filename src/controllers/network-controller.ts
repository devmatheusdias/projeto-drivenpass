import { Request, Response } from "express";
import httpStatus from "http-status";
import { Network } from "@prisma/client";
import networkService from "@/services/network-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";


export async function createNetwork(req: AuthenticatedRequest, res: Response): Promise<Response>{
  const { title, network, password } = req.body as Network;
  const { userId } = req;

  const newNetwork = await networkService.createNetwork(title, network, password, userId);

  return res.status(httpStatus.CREATED).json({newNetwork})
}

export async function getAllNetworks(req: AuthenticatedRequest, res: Response): Promise<Response>{
    
     const networks = await networkService.getAllNetworks();

     return res.status(httpStatus.OK).json({networks})
}

export async function getNetwork(req: AuthenticatedRequest, res: Response): Promise<Response>{
    const {id} = req.params;
    const { userId } = req;

    const network = await networkService.getNetwork(Number(id), userId);
    return res.status(httpStatus.OK).json({network})
}

export async function deleteNetwork(req: AuthenticatedRequest, res: Response): Promise<Response>{
    const {id} = req.params;
    const { userId } = req;


    const network = await networkService.deleteNetwork(Number(id), userId);
    return res.status(httpStatus.OK).json({network})

}