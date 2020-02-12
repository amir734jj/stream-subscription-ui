import {Role} from '../RoleEnum';
import {AbstractUserEntity} from '../abstracts/AbstractUserEntity';

export default class User extends AbstractUserEntity {
    id: string;
    firstname: string;
    lastname: string;
    description: string;
    email: string;
    phoneNumber: string;
    role: Role;
    photo: string;
}
