import { Router } from 'express';
import { singInPost } from '@/controllers/authentication-controller';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas/authentication-schemas';

const authenticationRouter = Router();

authenticationRouter.post('/', validateBody(signInSchema), singInPost);

export { authenticationRouter };
