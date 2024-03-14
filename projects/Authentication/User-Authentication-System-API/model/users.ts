import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

interface UserInfoLogin {
	username: string;
	password: string;
}

interface ModelResponse {
	success: boolean;
	data?: object | object[] | boolean;
	error?: object | Error;
}

const user_exist_by_username = async (username: string): Promise<ModelResponse> => {
	try {
		const users = await prisma.users.findMany({
			where: { username: username },
		});
		return { success: true, data: Boolean(users.length) };
	} catch (error: any) {
		return { success: false, error };
	}
};

const user_create = async (prismaArgs: Prisma.usersCreateArgs): Promise<ModelResponse> => {
	try {
		const user = await prisma.users.create(prismaArgs);
		return { success: true, data: user };
	} catch (error: any) {
		return { success: true, error };
	}
};

const user_update = async (prismaArgs: Prisma.usersUpdateArgs): Promise<ModelResponse> => {
	try {
		const user = await prisma.users.update(prismaArgs);
		return { success: true, data: user };
	} catch (error: any) {
		return { success: true, error };
	}
};

const user_delete = async (prismaArgs: Prisma.usersDeleteArgs): Promise<ModelResponse> => {
	try {
		const user = await prisma.users.delete(prismaArgs);
		return { success: true, data: user };
	} catch (error: any) {
		return { success: true, error };
	}
};

const user_authentication = async (userLoginInfo: UserInfoLogin): Promise<ModelResponse> => {
	const user = await prisma.users.findUnique({
		where: userLoginInfo,
	});
	return user ? { success: true, data: true } : { success: true, data: false };
};

const user_find = async (prismaArgs: Prisma.usersFindManyArgs): Promise<ModelResponse> => {
	try {
		const data = await prisma.users.findMany(prismaArgs);
		return { success: true, data };
	} catch (error: any) {
		return { success: false, error };
	}
};

export default {
	exist: {
		by: {
			username: user_exist_by_username,
		},
	},
	create: user_create,
	update: user_update,
	delete: user_delete,
	authentication: user_authentication,
	find: user_find,
};
