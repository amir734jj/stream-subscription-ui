import AbstractEntity from './abstracts/AbstractEntity';

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
