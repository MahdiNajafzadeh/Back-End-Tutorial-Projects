import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import logger from "./middleware/logger";

dotenv.config();

const app = express();
app.use(logger);
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 3000, () => {
	console.log(`Server Run on :D http://localhost:${process.env.PORT}`);
});
