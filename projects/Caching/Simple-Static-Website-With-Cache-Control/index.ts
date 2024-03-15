console.clear();
import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import { existsSync, readdirSync } from "node:fs";

import cacheControll from "./middleware/cache.controll";

dotenv.config();

const PORT = process.env.PORT || 3000;

const images = readdirSync("./views/image").map((v) => {
	return { id: v.split(".")[0] };
});

const app = express();
app.use(cacheControll);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/*", (req: Request, res: Response, next: NextFunction) => {
	const pathFile = path.join(__dirname, "views", req.path !== "/" ? req.path : "index");
	if (!(existsSync(pathFile + ".ejs") || existsSync(pathFile + ".html"))) return next();

	res.locals.title = req.path === '/image' ? `image : ${req.query?.id}` : "Wallpaper-World";
	res.locals.query = req.query || "";
	res.locals.images = images;

	try {
		res.render(pathFile + ".ejs");
	} catch (error) {
		console.error(error);
		res.redirect("/error");
	}
});

app.get("/error", (req: Request, res: Response, next: NextFunction) => {
	res.render("./views/error.ejs");
});

app.use(express.static(path.join(__dirname, "views")));

app.listen(PORT, () => console.log(`SERVER START SUCCESS : http://localhost:${PORT}`));
