import {Role} from '../RoleEnum';

export default class User {
	id: string;
	firstname: string;
	lastname: string;
	description: string;
	email: string;
	phoneNumber: string;
	role: Role;
	profileImage: string;
}
