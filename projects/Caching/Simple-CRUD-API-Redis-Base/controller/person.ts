import type { Request, Response, NextFunction } from "express";
import person from "../model/person";
import schemaError, { type ErrorSchemaInput } from "../helper/schema.error";

const person_get_all = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { success, data, error } = await person.get.all();
		if (!success) throw error;
		res.status(200).json({ success, data }).end();
	} catch (error: any) {
		const standardError = schemaError.INTERNAL(error);
		res.status(standardError.statusCode).json(standardError).end();
	}
};

const person_get_one = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200)
			.json(await person.get.one(parseInt(req.params.id)))
			.end();
	} catch (error: any) {
		const standardError = schemaError.INTERNAL(error);
		res.status(standardError.statusCode).json(standardError).end();
	}
};

const person_create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { success, data, error } = await person.create(req.body);
		if (!success) {
			const standardError = schemaError.BAD_REQUEST(error as ErrorSchemaInput);
			return res.status(standardError.statusCode).json(standardError).end();
		}
		res.status(200).json({ success, data }).end();
	} catch (error: any) {
		const standardError = schemaError.INTERNAL(error);
		res.status(standardError.statusCode).json(standardError).end();
	}
};

const person_update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { success, data, error } = await person.update(parseInt(req.params.id), req.body);
		if (!success) {
			const standardError = schemaError.BAD_REQUEST(error as ErrorSchemaInput);
			return res.status(standardError.statusCode).json(standardError).end();
		}
		res.status(200).json({ success, data }).end();
	} catch (error: any) {
		const standardError = schemaError.INTERNAL(error);
		res.status(standardError.statusCode).json(standardError).end();
	}
};
const person_delete = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { success, data, error } = await person.delete(parseInt(req.params.id));
		if (!success) {
			const standardError = schemaError.BAD_REQUEST(error as ErrorSchemaInput);
			return res.status(standardError.statusCode).json(standardError).end();
		}
		res.status(200).json({ success, data }).end();
	} catch (error: any) {
		const standardError = schemaError.INTERNAL(error);
		res.status(standardError.statusCode).json(standardError).end();
	}
};

export default {
	get: {
		all: person_get_all,
		one: person_get_one,
	},
	create: person_create,
	update: person_update,
	delete: person_delete,
};
