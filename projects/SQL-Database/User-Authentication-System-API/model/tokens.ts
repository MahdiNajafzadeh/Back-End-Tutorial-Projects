import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

interface ModelResponse {
	success: boolean;
	data?: object | object[] | boolean;
	error?: object | Error;
}