import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import {errorHandlingMiddleware} from "../src/middlewares/error-handling-middleware"
import {usersRouter, authenticationRouter, credentialsRouter, networkRouter} from "routers"

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/credentials', credentialsRouter)
  .use('/network', networkRouter)
  .use(errorHandlingMiddleware);


export default app;
