import type { NextFunction, Request, Response } from "express";

const logger = (request: Request, response: Response, next: NextFunction) => {
	console.log(`${request.method} : ${request.path}`);
	next();
};

export default logger;
