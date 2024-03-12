import { type Request, type Response } from "express";

const logger = (request: Request, response: Response, next: Function) => {
	console.log(`${request.method} : ${request.path}`);
	next();
};

export default logger;
