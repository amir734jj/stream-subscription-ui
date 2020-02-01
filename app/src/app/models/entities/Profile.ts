import AbstractEntity from './AbstractEntity';
import {Guid} from 'guid-typescript';

export interface IProfile {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phoneNumber: string;
  description: string;
  photo: string;
}

export class Profile extends AbstractEntity implements IProfile {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phoneNumber: string;
  description: string;
  photo: string;

  constructor() {
    super();
  }
}
