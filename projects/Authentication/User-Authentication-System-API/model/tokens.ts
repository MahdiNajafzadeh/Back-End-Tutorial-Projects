import crypto from "node:crypto";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ModelResponse {
	success: boolean;
	data?: object | object[] | boolean;
	error?: object | Error;
}

const set = async (username: string): Promise<ModelResponse> => {
	try {
		const secret = crypto.randomUUID().toString();
		const data = await prisma.$queryRaw`
		INSERT INTO "tokens" ( userId , secret )
		VALUES (
		(SELECT id FROM users WHERE username = \'${username}\'),
		\'${secret}\'
		)
		`;
		return { success: true, data: data ? data : undefined };
	} catch (error: any) {
		return { success: false, error };
	}
};

const get = async (username: string) => {};

export default {
	set,
	// get,
	// validate,
};
