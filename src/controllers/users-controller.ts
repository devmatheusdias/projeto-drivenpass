import { userService } from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { User } from "@prisma/client";

export async function usersPost(req: Request, res: Response): Promise<Response>{
  const { email, password} = req.body as User

  const user = await userService.createUser(email, password);

  return res.status(httpStatus.CREATED).json({user})
  
}