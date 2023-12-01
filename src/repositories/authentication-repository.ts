import { Prisma, Session} from '@prisma/client';
import prisma from 'config/database';

async function createSession(data: Prisma.SessionUncheckedCreateInput): Promise<Session> {
  return prisma.session.create({
    data,
  });
}

async function findSession(token: string) : Promise<Session> {
  return prisma.session.findFirst({
    where: {
      token,
    },
  });
}

export const authenticationRepository = {
  createSession,
  findSession,
};
