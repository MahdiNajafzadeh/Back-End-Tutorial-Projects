import type { Request, Response, NextFunction } from "express";
import jwt from "../helper/jwt";
import response from "../constant/response";

const noToken = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;
	descriptor.value = function (req: Request, res: Response, next: NextFunction) {
		if (!req.cookies?.token) {
			originalMethod.call(this, req, res, next);
		} else {
			return response.error.auth(res, "you have token");
		}
	};
	return descriptor;
};

const haveToken = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;
	descriptor.value = function (req: Request, res: Response, next: NextFunction) {
		const token = req.cookies?.token;
		if (!token) {
			return response.error.auth(res, "Token is missing");
		}
		if (jwt.validate(token)) {
			originalMethod.call(this, req, res, next);
		} else {
			return response.error.auth(res, "Invalid token");
		}
	};
	return descriptor;
};

const includePayload = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;
	descriptor.value = function (req: Request, res: Response, next: NextFunction) {
		const payload = jwt.decode(req.cookies?.token);
		res.locals.token = {
			payload,
			token: req.cookies?.token,
		};
		originalMethod.call(this, req, res, next);
	};
	return descriptor;
};

export default { noToken, haveToken, includePayload };
