import { Router } from 'express';
import { validateBody} from '@/middlewares';
import { authenticateToken } from '@/middlewares/authentication-middleware';
import { credentialSchema } from '@/schemas/credentials-schemas';
import { createCredentials, getAllCredentials, getCredential, deleteCredential } from '@/controllers/credentials-controller';

const credentialsRouter = Router();

credentialsRouter
    .all('/*', authenticateToken)
    .post('/', validateBody(credentialSchema), createCredentials)
    .get('/', getAllCredentials)
    .get('/:id', getCredential)
    .put('/:id', deleteCredential)
export { credentialsRouter };