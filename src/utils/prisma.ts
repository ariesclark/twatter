/* eslint-disable import/named */
/* eslint-disable import/export */
import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";

export const prisma = new PrismaClient();
