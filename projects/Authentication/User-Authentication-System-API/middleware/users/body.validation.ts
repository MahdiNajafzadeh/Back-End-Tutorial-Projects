import type { Request, Response, NextFunction } from "express";
import response from "../../constant/response";
import joi, { type ObjectSchema } from "joi";

interface SchemaCollection {
	[key: string]: ObjectSchema<any>;
}

const schemas: SchemaCollection = {
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

const bodyValidator = (req: Request, res: Response, next: NextFunction) => {
	const identifier = `${req.method}:${req.path}`;
	if (!Object.keys(schemas).includes(identifier)) {
		return next();
	}
	const { error } = schemas[identifier].validate(req.body);
	if (error) {
		return response.error.bad(res, error?.message, error?.details);
	}
	next();
};

export default bodyValidator;
