import type { Request, Response, NextFunction } from "express";
import { token } from "../decorator";
import jwt from "../helper/jwt";
import model from "../model/index";
import response from "../constant/response";

class controller {
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

	info = {
		get(req: Request, res: Response, next: NextFunction) {},
		edit(req: Request, res: Response, next: NextFunction) {},
	};
}

export default new controller();
