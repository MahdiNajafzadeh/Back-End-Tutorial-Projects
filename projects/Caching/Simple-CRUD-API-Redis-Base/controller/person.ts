import type { Request, Response, NextFunction } from "express";
import person from "../model/person";

const person_get_all = () => {};
const person_get_one = () => {};
const person_create = () => {};
const person_update = () => {};
const person_delete = () => {};

export default {
	get: {
		all: person_get_all,
		one: person_get_one,
	},
	create: person_create,
	update: person_update,
	delete: person_delete,
};
