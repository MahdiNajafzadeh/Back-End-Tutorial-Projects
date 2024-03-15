import type { Request, Response, NextFunction } from "express";

function cacheControll(req: Request, res: Response, next: NextFunction) {
	console.log(req.url);
	next();
}

export default cacheControll;
