import { createClient } from "redis";

const REDIS_URL = process.env?.REDIS_URL as string;

let countRedisError = 0;

const database = await createClient({ url: REDIS_URL })
	.on("error", (error) => {
		console.log(`REDIS CONNECT ERROR : [CODE = ${error?.code}]`);
	})
	.once("connect", () => {
		console.log(`REDIS CONNECT SUCCESS : ${REDIS_URL}`);
		countRedisError = 0;
	})
	.connect();

export default database;
