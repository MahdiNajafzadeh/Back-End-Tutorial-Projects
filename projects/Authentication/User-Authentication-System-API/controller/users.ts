import type { Request, Response, NextFunction } from "express";
import { token } from "../decorator";
import jwt from "../helper/jwt";
import model from "../model/index";
import response from "../constant/response";

class Controller {
	@token.noToken
	async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const { data: isExistUser } = await model.users.exist.by.username(req.body.username);
			if (isExistUser) return response.error.bad(res, "username is exist");
			const { success, error } = await model.users.create({
				data: req.body,
			});
			if (!success) return response.error.internal(res, undefined, error);
			response.success(res, "signup is success");
		} catch (error: any) {
			response.error.internal(res, undefined, Object.keys(error).length ? error : undefined);
		}
	}

	@token.noToken
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { data: login } = await model.users.authentication(req.body);
			if (!login) return response.error.auth(res, "login is failed");
			const token = jwt.encode({ username: req.body.username }, { expiresIn: "1m" });
			res.cookie("token", token, { maxAge: 60 * 1000 });
			response.success(res, "login is success");
		} catch (error: any) {
			response.error.auth(res, error?.message);
		}
	}

	@token.haveToken
	logout(req: Request, res: Response, next: NextFunction) {
		if (!req.cookies?.token) return response.error.auth(res);
		res.cookie("token", "", { maxAge: 0 });
		response.success(res, "logout is success");
	}

	@token.haveToken
	@token.includePayload
	private async info_get(req: Request, res: Response, next: NextFunction) {
		const username = res.locals?.token?.payload?.username as string;
		const { success, data, error } = await model.users.find({
			where: { username },
		});
		if (success) {
			response.success(res, "get user info success", data);
		} else {
			console.log(error);
			response.error.internal(res);
		}
	}

	@token.haveToken
	@token.includePayload
	private async info_edit(req: Request, res: Response, next: NextFunction) {
		const username = res.locals?.token?.payload?.username as string;
		const { success, data, error } = await model.users.update({
			where: { username },
			data: req.body,
		});
		if (success) {
			response.success(res, "edit user info success", data);
		} else {
			console.log(error);
			response.error.internal(res);
		}
	}

	info = {
		get: this.info_get.bind(this),
		edit: this.info_edit.bind(this),
	};
}

export default new Controller();
