import {Profile} from '../models/entities/Profile';

export type ProfileType = {
  token: string;
  timestamp: Date;
  expires: Date
} & Profile;
