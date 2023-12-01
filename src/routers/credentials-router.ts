import { Router } from 'express';
import { validateBody} from 'middlewares';
import { authenticateToken } from 'middlewares';
import { credentialSchema } from 'schemas';
import { createCredentialsController, getAllCredentialsController, getCredentialController, deleteCredentialController } from 'controllers';

const credentialsRouter = Router();

credentialsRouter
    .all('/*', authenticateToken)
    .post('/', validateBody(credentialSchema), createCredentialsController)
    .get('/', getAllCredentialsController)
    .get('/:id', getCredentialController)
    .put('/:id', deleteCredentialController)
export { credentialsRouter };