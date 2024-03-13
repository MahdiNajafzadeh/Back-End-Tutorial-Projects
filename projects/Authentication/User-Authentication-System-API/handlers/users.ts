import { type Request, type Response } from "express";
import model from "../model/index";
import response from "../constant/response";

const controller = {
	async signup(req: Request, res: Response) {
		try {
			const { data: isExistUser } = await model.users.exist.by.username(req.body.username);
			if (isExistUser) {
				return response.error[403](res, "username is exist");
			}
			const { success, data, error } = await model.users.create({
				data: req.body,
			});
			if (!success) {
				return response.error[500](res, undefined, error);
			}
			response.success[200](res, "signup is success");
		} catch (error: any) {
			response.error[500](res, undefined, Object.keys(error).length ? error : undefined);
		}
	},
	async login(req: Request, res: Response) {
		try {
			const { data: login } = await model.users.authentication(req.body);
			if (!login) {
				return response.error[401](res, "login is failed");
			}
			response.success[200](res, "login is success");
		} catch (error: any) {
			response.error[500](res, error?.message);
		}
	},
	logout(req: Request, res: Response) {
		response.success[200](res, "logout is success");
	},
};

export default controller;
