import database from "../database/redis";

interface Person {
	name: string;
	family: string;
	age: number;
	email: string;
}

const person_get_all = async () => {
	const persons = await database.json.get('0');
	console.log(persons);
	return persons;
};
const person_get_one = (id: number) => {};
const person_create = (person: Person) => {};
const person_update = (id: number, person: Person) => {};
const person_delete = (id: number) => {};

export default {
	get: {
		all: person_get_all,
		one: person_get_one,
	},
	create: person_create,
	update: person_update,
	delete: person_delete,
};
