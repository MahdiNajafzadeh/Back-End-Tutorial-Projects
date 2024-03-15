import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(routes);
app.listen(PORT, () => {
	console.log(`SERVER START SUCCESS : HTTP://LOCALHOST:${PORT}`);
});
