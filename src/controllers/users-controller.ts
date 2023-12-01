import { createUserService } from "services";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { User } from "@prisma/client";

export async function createUserController(req: Request, res: Response): Promise<Response>{
  const { email, password} = req.body as User

  const user = await createUserService(email, password);

  return res.status(httpStatus.CREATED).send(user)
}
