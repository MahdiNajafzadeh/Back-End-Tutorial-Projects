import { type Response } from "express";

const success_200 = (r: Response, message?: string, data?: any) => {
	return r
		.status(200)
		.json({
			status: true,
			message: message ? message : "task is success",
			data
		})
		.end();
};

const error_401 = (r: Response, message?: string, data?: any) => {
	return r
		.status(401)
		.json({
			status: false,
			code: "AUTH-ERROR",
			message: message ? message : "authentication is failed",
			data
		})
		.end();
};

const error_403 = (r: Response, message?: string, data?: any) => {
	return r
		.status(403)
		.json({
			status: false,
			code: "BAD-REQUEST-ERROR",
			message: message ? message : "request is bad",
			data
		})
		.end();
};

const error_500 = (r: Response, message?: string, data?: any) => {
	return r
		.status(500)
		.json({
			status: false,
			code: "INTERNAL-ERROR",
			message: message ? message : "server can not respond",
			data,
		})
		.end();
};

export default {
	success: {
		"200": success_200,
	},
	error: {
		"401": error_401,
		"403": error_403,
		"500": error_500,
	},
};
