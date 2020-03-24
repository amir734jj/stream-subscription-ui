import User from './User';

export class Profile {
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
  photo: string;
  user?: User;
}
