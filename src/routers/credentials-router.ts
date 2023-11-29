import { Router } from 'express';
import { validateBody} from '@/middlewares';
import { authenticateToken } from '@/middlewares/authentication-middleware';
import { credentialSchema } from '@/schemas/credentials-schemas';
import { createCredentials, getAllCredentials } from '@/controllers/credentials-controller';

const credentialsRouter = Router();

credentialsRouter
    .post('/', validateBody(credentialSchema), createCredentials)
    .get('/', getAllCredentials)

export { credentialsRouter };