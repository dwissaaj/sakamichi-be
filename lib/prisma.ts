import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { Context } from "hono";
import { env } from "hono/adapter";
const prismaClients = {
  async prisma(c: Context) {
    const { DB } = env<{ DB: D1Database }>(c);
    const adapter = new PrismaD1(DB);
    const prisma = new PrismaClient({ adapter });
    return prisma;
  },
};

export default prismaClients;
