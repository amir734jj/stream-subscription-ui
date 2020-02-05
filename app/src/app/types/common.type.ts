import {Role} from '../models/RoleEnum';

export type ProfileType = { role: Role }

export type ProfileWithTokenType = ProfileType & { token: string };
