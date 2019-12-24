import AbstractEntity from './AbstractEntity';

export class Profile extends AbstractEntity {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phoneNumber: string;
  description: string;

  constructor() {
    super();
  }
}
