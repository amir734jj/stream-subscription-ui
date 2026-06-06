import User from './User';
import {StreamFtpSinkRelationship} from './StreamFtpSinkRelationship';

export class FtpSink {
  id: string;
  name: string;
  protocol = 'ftp';
  username: string;
  password: string;
  host: string;
  port = 21;
  path = '';
  user: User;
  favorite = false;
  streamFtpSinkRelationships: StreamFtpSinkRelationship[] = [];
}
