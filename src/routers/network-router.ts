import { Router } from 'express';
import { validateBody} from '@/middlewares';
import { authenticateToken } from '@/middlewares/authentication-middleware';
import { createNetwork, getAllNetworks, getNetwork, deleteNetwork } from '@/controllers/network-controller';
import { createNetworkSchema } from '@/schemas/network-schema';


const networkRouter = Router();

networkRouter
    .post('/', validateBody(createNetworkSchema), createNetwork)
    .get('/', getAllNetworks)
    .get('/:id', getNetwork)
    .put('/:id', deleteNetwork)
export { networkRouter };