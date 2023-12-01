import prisma from "config/database";
import { Network } from "@prisma/client";

export async function findNetworkById(networkId: number): Promise<Network> {

    return prisma.network.findFirst({
      where:{
        id: networkId
      }
    });
  }

export async function createNetwork(title: string, network: string, password: string, userId: number) : Promise<Network>{
    return prisma.network.create({
        data:{
          title,
          network,
          password,
          userId
        }
    })
}

export async function getAllNetworks(): Promise<Network[]> {
    return prisma.network.findMany({});
}

export async function getNetwork(networkId: number, userId: number) : Promise<Network>{
    return prisma.network.findFirst({
        where:{
            id: networkId,
            userId: userId
        }
    })
}

export async function deleteNetwork(networkId: number, userId: number): Promise<Network> {
    return prisma.network.delete({
        where:{
            id: networkId,
            userId
        }
    })
}