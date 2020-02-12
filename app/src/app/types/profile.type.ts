import {Role} from '../models/RoleEnum';

export interface ProfileType { role: Role; }

export type ProfileWithTokenType = ProfileType & { token: string, timestamp: Date };
