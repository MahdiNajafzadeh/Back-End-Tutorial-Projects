import { createClient } from "redis";

const REDIS_URL = process.env?.REDIS_URL as string;

let countRedisError = 0;

const database = createClient({ url: REDIS_URL })
	.on("error", (v) => {
		console.log(v);
		countRedisError++;
	})
	.once("connect", (v) => {
		console.log(v);
		countRedisError = 0;
	})
	.connect();

export default database;
