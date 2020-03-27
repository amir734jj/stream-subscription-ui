import User from './User';

export class FtpSink {
  id: string;
  name: string;
  username: string;
  password: string;
  host: string;
  port = 21;
  path = '';
  user: User;
}
