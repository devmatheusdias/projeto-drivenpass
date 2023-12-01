import { Router } from 'express';
import { validateBody } from 'middlewares';
import { createUserSchema } from 'schemas';
import { createUserController } from 'controllers';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), createUserController);

export { usersRouter };