import User from './User';
import {StreamFtpSinkRelationship} from './StreamFtpSinkRelationship';

export class Stream {
  id: string;
  name: string;
  filter = '';
  url: string;
  user: User;
  ftpSinkRelationships: StreamFtpSinkRelationship[] = [];
}
