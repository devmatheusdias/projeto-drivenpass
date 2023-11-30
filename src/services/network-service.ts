import { Credential, Network } from "@prisma/client";
import bcrypt from "bcrypt"
import { notFoundError } from "@/errors/not-found-error";
import { networkRepository } from "@/repositories/network-repository";
import { ForbiddenError } from "@/errors/forbidden-error";

export async function findNetworkById(networkId: number): Promise<Network>{
    const network = await networkRepository.findNetworkById(networkId);
    return network;
}

async function createNetwork(title: string, network: string, password: string, userId: number): Promise<Network>{

    //Por ser um dado sensível, o campo de senha da credencial deve ser criptografado usando um segredo da aplicação.
    const hashedPassword = await bcrypt.hash(password, 12);

    return networkRepository.createNetwork(title, network, hashedPassword, userId)
}

async function getAllNetworks(): Promise<Network[]>{

    const networks = await networkRepository.getAllNetworks();
    if(networks.length === 0) throw notFoundError();

    return networks
}

export async function getNetwork(networkId: number, userId: number): Promise<Network>{

    const network = await networkRepository.getNetwork(networkId, userId);
    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(!network) throw notFoundError();

    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(network.userId != userId) throw ForbiddenError();
    
    return network;
}

export async function deleteNetwork(networkId: number, userId: number): Promise<Network>{

    const network = await findNetworkById(networkId);
    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(!network) throw notFoundError();

    // Se o usuário procurar por uma credencial que não é dele ou que não existe
    if(network.userId != userId) throw ForbiddenError();
    
    await networkRepository.deleteNetwork(network.id, userId);

    return network;
}

const networkService = { createNetwork, getAllNetworks, getNetwork, deleteNetwork }

export default networkService;