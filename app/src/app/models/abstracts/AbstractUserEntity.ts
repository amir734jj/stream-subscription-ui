export abstract class AbstractUserEntity {
	firstname: string;
	lastname: string;

	name() {
		return `${this.firstname} ${this.lastname}`;
	}
}
