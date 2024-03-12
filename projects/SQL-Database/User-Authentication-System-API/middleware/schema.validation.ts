import type { Request, Response } from "express";
import joi, { type ObjectSchema } from "joi";

interface Schema {
	[key: string]: ObjectSchema<any>;
}

const schemas: Schema = {
	"POST:/user/signup": joi.object().keys({
		username: joi.string().min(4).required(),
		name: joi.string().required(),
		email: joi.string().email().required(),
		password: joi.string().min(8).required(),
	}),
	"POST:/user/login": joi.object().keys({
		username: joi.string().min(4).required(),
		password: joi.string().min(8).required(),
	}),
};

const validator = (request: Request, response: Response, next: Function) => {
	const identifier = `${request.method}:${request.path}`;
	if (!Object.keys(schemas).includes(identifier)) return;
	const { error } = schemas[identifier].validate(request.body);
	if (!error) {
		next();
	} else {
		response
			.status(403)
			.json({
				status: false,
				message: error?.message,
				error: error?.details,
			})
	}
};

export default validator;
