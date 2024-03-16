import type { Request, Response, NextFunction } from "express";
import person from "../model/person";

const person_get_all = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.url);
	res.status(200).json(await person.get.all());
	// res.end();
};
const person_get_one = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.url);
	res.send("test");
};
const person_create = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.url);
	res.send("test");
};
const person_update = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.url);
	res.send("test");
};
const person_delete = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.url);
	res.send("test");
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
