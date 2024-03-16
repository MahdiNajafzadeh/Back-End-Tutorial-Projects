import database from "../database/redis";

interface Person {
	id: number;
	name: string;
	family: string;
	age: number;
	email: string;
}

interface ModelResponse {
	success: boolean | false;
	data?: Person | Person[] | undefined;
	error?: ModelError;
}

interface ModelError {
	from: string | "unknown";
	message: string | "no message";
	info?: any;
}

const person_get_all = async (): Promise<ModelResponse> => {
	try {
		const keys = await database.keys("*");
		if (!keys.length) return { success: true, data: [] };
		const persons = await database.mGet(keys);
		return { success: true, data: persons.map((v) => JSON.parse(String(v))) };
	} catch (error: any) {
		return {
			success: false,
			error: {
				from: "model.person.get.all",
				message: error?.message || "no message",
				info: error,
			},
		};
	}
};

const person_get_one = async (id: number): Promise<ModelResponse> => {
	try {
		const person = await database.get(String(id));
		return { success: true, data: JSON.parse(String(person)) };
	} catch (error: any) {
		return {
			success: false,
			error: {
				from: "model.person.get.one",
				message: error?.message || "no message",
				info: error,
			},
		};
	}
};

const person_create = async (person: Person): Promise<ModelResponse> => {
	try {
		const existRedisResponse = await database.exists(String(person.id));
		if (existRedisResponse) {
			return {
				success: false,
				error: {
					from: "model.person.create",
					message: "person with this id is exist",
				},
			};
		}
		const createRedisResponse = await database.set(String(person.id), JSON.stringify(person));
		if (createRedisResponse === "OK") {
			return { success: true, data: person };
		} else {
			return {
				success: false,
				error: {
					from: "model.person.create",
					message: createRedisResponse as string,
				},
			};
		}
	} catch (error: any) {
		return {
			success: false,
			error: {
				from: "model.person.create",
				message: error?.message || "no message",
				info: error,
			},
		};
	}
};

const person_update = async (id: number, person: Person): Promise<ModelResponse> => {
	try {
		const existRedisResponse = await database.exists(String(id));
		if (!existRedisResponse) {
			return {
				success: false,
				error: {
					from: "model.person.update",
					message: "person with this id is not exist",
				},
			};
		}
		const { success, data, error } = await person_get_one(id);
		if (!success) return { success, error };
		const updateRedisResponse = await database.set(
			String(id),
			JSON.stringify({ ...data, ...person })
		);
		if (updateRedisResponse === "OK") {
			return {
				success: true,
				data: { ...data, ...person },
			};
		} else {
			return {
				success: false,
				error: {
					from: "model.person.update",
					message: updateRedisResponse as string,
				},
			};
		}
	} catch (error: any) {
		return {
			success: false,
			error: {
				from: "model.person.update",
				message: error?.message || "no message",
				info: error,
			},
		};
	}
};
const person_delete = async (id: number): Promise<ModelResponse> => {
	try {
		const existRedisResponse = await database.exists(String(id));
		if (!existRedisResponse) {
			return {
				success: false,
				error: {
					from: "model.person.delete",
					message: "person with this id is not exist",
				},
			};
		}
		const deleteRedisResponse = await database.del(String(id));
		if (deleteRedisResponse) {
			return {
				success: true,
			};
		} else {
			return {
				success: false,
				error: {
					from: "model.person.delete",
					message: "unknown message",
				},
			};
		}
	} catch (error: any) {
		return {
			success: false,
			error: {
				from: "model.person.delete",
				message: error?.message || "no message",
				info: error,
			},
		};
	}
};

export default {
	get: {
		all: person_get_all,
		one: person_get_one,
	},
	create: person_create,
	update: person_update,
	delete: person_delete,
};
