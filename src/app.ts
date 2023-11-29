import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import errorHandlingMiddleware from './middlewares/error-handling-middleware';

import {usersRouter, authenticationRouter, credentialsRouter} from '@/routers';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/signIn', authenticationRouter)
  .use('/credentials', credentialsRouter)
  .use(errorHandlingMiddleware);


export default app;
