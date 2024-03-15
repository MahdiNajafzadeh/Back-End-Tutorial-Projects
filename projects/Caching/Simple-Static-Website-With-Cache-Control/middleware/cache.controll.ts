import type { Request, Response, NextFunction } from "express";

function cacheControll(req: Request, res: Response, next: NextFunction) {
	switch (true) {
		case req.path.endsWith(".jpg"):
		case req.path.endsWith(".png"):
			res.setHeader("Cache-Control", "max-age=60000");
			break;
		case req.path.endsWith(".css"):
			res.setHeader("Cache-Control", "max-age=604800, public");
			break;
		default:
			res.setHeader("Cache-Control", "");
			break;
	}
	next();
}

export default cacheControll;
