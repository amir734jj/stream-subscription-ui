import User from './User';
import {StreamFtpSinkRelationship} from './StreamFtpSinkRelationship';

export class FtpSink {
  id: string;
  name: string;
  username: string;
  password: string;
  host: string;
  port = 21;
  path = '';
  user: User;
  favorite: boolean;
  ftpSinkRelationships: StreamFtpSinkRelationship[] = [];
}
