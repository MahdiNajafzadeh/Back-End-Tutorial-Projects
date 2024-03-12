import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const controller = {
	async signup(request: Request, response: Response) {
		try {
			const existUser = await prisma.users.findMany({
				where: { username: request.body.username },
			});
			if (existUser.length) {
				response.status(403).json({
					status: false,
					code: "BAD-REQUEST",
					message: "username is exist",
				});
			}
			const user = await prisma.users.create({
				data: request.body,
			});
			response.status(200).json({
				status: true,
				message: "signup is success",
				data: user,
			});
		} catch (error: any) {
			console.log(error);
			response.status(500).json({
				status: false,
				message: error?.message,
				error: Object.keys(error).length ? error : undefined,
			});
		}
	},
	async login(request: Request, response: Response) {
		try {
			const userLoginInfo = request.body;
			const user = await prisma.users.findUnique({
				where: userLoginInfo,
			});
			if (!user) {
				response.status(401).json({
					status: false,
					code: "AUTH-ERROR",
					message: "validation is not success",
				});
			}
			response.status(200).json({
				status: true,
				message: "login is success",
			});
		} catch (error: any) {
			response.status(500).json({
				status: false,
				message: error?.message,
				error,
			});
		}
	},
	logout(request: Request, response: Response) {
		response.status(200).json({
			status: true,
			message: "logout is success",
		});
	},
};

export default controller;
