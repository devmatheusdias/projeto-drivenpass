import { Router } from 'express';
import { validateBody} from 'middlewares';
import { authenticateToken } from 'middlewares';
import { createNetworkController, getAllNetworksController, getNetworkController, deleteNetworkController } from 'controllers';
import { createNetworkSchema } from 'schemas';


const networkRouter = Router();

networkRouter
    .all('/*', authenticateToken)
    .post('/', validateBody(createNetworkSchema), createNetworkController)
    .get('/', getAllNetworksController)
    .get('/:id', getNetworkController)
    .put('/:id', deleteNetworkController)
export { networkRouter };