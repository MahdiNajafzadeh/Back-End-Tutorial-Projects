import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import { existsSync } from "node:fs";

import cacheControll from "./middleware/cache.controll";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cacheControll);

app.use(express.static(path.join(__dirname, 'views')));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.redirect("/index.ejs");
});

app.get("/*", (req: Request, res: Response, next: NextFunction) => {
	const pathFile = path.join(__dirname, "views", req.path);
	if (!(existsSync(pathFile + ".ejs") || existsSync(pathFile + ".html"))) return next();

	res.locals.title = req.query?.image ? `image : ${req.query?.image}` : "background images";
	// res.locals.image = req.query?.image || "";

	try {
		res.render(pathFile + ".ejs");
	} catch (error) {
		console.error(error);
	}
});

app.listen(PORT, () => console.log(`SERVER START SUCCESS :  http://localhost:${PORT}`));
