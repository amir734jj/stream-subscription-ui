import User from './User';

export class FtpSink {
  id: string;
  username: string;
  password: string;
  host: string;
  port: number;
  path: string;
  user: User;
}
