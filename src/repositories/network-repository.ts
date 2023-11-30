import prisma from "@/config/database";
import { Network } from "@prisma/client";

async function findNetworkById(networkId: number): Promise<Network> {

    return prisma.network.findFirst({
      where:{
        id: networkId
      }
    });
  }

async function createNetwork(title: string, network: string, password: string, userId: number) : Promise<Network>{
    return prisma.network.create({
        data:{
          title,
          network,
          password,
          userId
        }
    })
}

async function getAllNetworks(): Promise<Network[]> {
    return prisma.network.findMany({});
}

async function getNetwork(networkId: number, userId: number) : Promise<Network>{
    return prisma.network.findFirst({
        where:{
            id: networkId,
            userId: userId
        }
    })
}

async function deleteNetwork(networkId: number, userId: number): Promise<Network> {
    return prisma.network.delete({
        where:{
            id: networkId,
            userId
        }
    })
}

export const networkRepository = { createNetwork, findNetworkById, getAllNetworks, getNetwork, deleteNetwork}