import { type Response } from "express";

const success_200 = (res: Response, message?: string, data?: any) => {
	return res
		.status(200)
		.json({
			status: true,
			message: message ? message : "task is success",
			data,
		})
		.end();
};

const error_auth = (res: Response, message?: string, data?: any) => {
	return res
		.status(401)
		.json({
			status: false,
			code: "AUTH-ERROR",
			message: message ? message : "authentication is failed",
			data,
		})
		.end();
};

const error_bad = (res: Response, message?: string, data?: any) => {
	return res
		.status(403)
		.json({
			status: false,
			code: "BAD-REQUEST-ERROR",
			message: message ? message : "request is bad",
			data,
		})
		.end();
};

const error_internal = (res: Response, message?: string, data?: any) => {
	return res
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
	success: success_200,
	error: {
		auth: error_auth,
		bad: error_bad,
		internal: error_internal,
	},
};
