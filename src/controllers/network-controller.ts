import { Request, Response } from "express";
import httpStatus from "http-status";
import { Network } from "@prisma/client";
import { AuthenticatedRequest } from "middlewares";
import { createNetworkService, getAllNetworksService, getNetworkService, deleteNetworkService} from "services";

export async function createNetworkController(req: AuthenticatedRequest, res: Response): Promise<Response>{
  const { title, network, password } = req.body as Network;
  const { userId } = req;

  const newNetwork = await createNetworkService(title, network, password, userId);

  return res.status(httpStatus.CREATED).json({newNetwork})
}

export async function getAllNetworksController(req: AuthenticatedRequest, res: Response): Promise<Response>{
    
     const networks = await getAllNetworksService();

     return res.status(httpStatus.OK).json({networks})
}

export async function getNetworkController(req: AuthenticatedRequest, res: Response): Promise<Response>{
    const {id} = req.params;
    const { userId } = req;

    const network = await getNetworkService(Number(id), userId);
    return res.status(httpStatus.OK).json({network})
}

export async function deleteNetworkController(req: AuthenticatedRequest, res: Response): Promise<Response>{
    const {id} = req.params;
    const { userId } = req;


    const network = await deleteNetworkService(Number(id), userId);
    return res.status(httpStatus.OK).json({network})

}