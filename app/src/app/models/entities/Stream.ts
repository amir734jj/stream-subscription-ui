import User from './User';
import {StreamFtpSinkRelationship} from './StreamFtpSinkRelationship';

export class Stream {
  id: string;
  name: string;
  filter: string;
  url: string;
  user: User;
  ftpSinkRelationships: StreamFtpSinkRelationship[] = [];
}
