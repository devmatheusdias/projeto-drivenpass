import { Credential, Network } from "@prisma/client";
import bcrypt from "bcrypt"
import { notFoundError } from "errors";
import { findNetworkById, createNetwork, getAllNetworks, getNetwork, deleteNetwork } from "repositories";
import { ForbiddenError } from "errors/forbidden-error";

export async function findNetworkByIdService(networkId: number): Promise<Network>{
    const network = await findNetworkById(networkId);
    return network;
}

export async function createNetworkService(title: string, network: string, password: string, userId: number): Promise<Network>{

    //Por ser um dado sensível, o campo de senha da credencial deve ser criptografado usando um segredo da aplicação.
    const hashedPassword = await bcrypt.hash(password, 12);

    return createNetwork(title, network, hashedPassword, userId)
}

export async function getAllNetworksService(): Promise<Network[]>{

    const networks = await getAllNetworks();
    if(networks.length === 0) throw notFoundError();

    return networks
}

export async function getNetworkService(networkId: number, userId: number): Promise<Network>{

    const network = await getNetwork(networkId, userId);
    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(!network) throw notFoundError();

    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(network.userId != userId) throw ForbiddenError();
    
    return network;
}

export async function deleteNetworkService(networkId: number, userId: number): Promise<Network>{

    const network = await findNetworkById(networkId);
    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(!network) throw notFoundError();

    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(network.userId != userId) throw ForbiddenError();
    
    await deleteNetwork(network.id, userId);

    return network;
}

