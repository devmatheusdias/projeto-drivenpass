import Joi from 'joi';
import { Credential } from '@prisma/client';


export const credentialSchema = Joi.object<Credential>({
  title: Joi.string().min(3).required(),
  url: Joi.string().uri().required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().min(3).required(),
});