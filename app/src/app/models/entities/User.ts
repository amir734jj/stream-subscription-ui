import AbstractEntity from './abstracts/AbstractEntity';

export default class User extends AbstractEntity {
	id: string;
	firstname: string;
	lastname: string;
	description: string;
	email: string;
	phoneNumber: string;
}
