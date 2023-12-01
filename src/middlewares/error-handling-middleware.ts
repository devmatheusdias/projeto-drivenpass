import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export type AppError = Error & {
  name: string;
};

export function errorHandlingMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  // Daqui para baixo serão os seus erros
  if (error.name === 'notFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
  }

  if (error.name === 'invalidIdError') {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
  }
  
  if (error.name === 'ConflictError' || error.name === 'DuplicatedEmailError') {
    return res.status(httpStatus.CONFLICT).send({
      message: error.message,
    });
  }

  if (error.name === 'InvalidDataError' || error.name === 'InvalidCEPError') {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: error.message,
    });
  }

  if (error.name === 'InvalidCredentialsError' || error.name === 'JsonWebTokenError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: error.message,
    });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: error.message,
    });
  }

  if (error.name === 'DuplicatedCredentialError') {
    return res.status(httpStatus.CONFLICT).send({
      message: error.message,
    });
  }

  if (error.name === 'NotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: error.message,
    });
  }


  if (error.name === 'ForbiddenError') {
    return res.status(httpStatus.FORBIDDEN).send({
      message: error.message,
    });
  }


  

  console.log(error);
  return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}