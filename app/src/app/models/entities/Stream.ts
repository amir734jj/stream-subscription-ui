import User from './User';
import {StreamFtpSinkRelationship} from './StreamFtpSinkRelationship';

export class Stream {
  id: string;
  url: string;
  user: User;
  ftpSinksRelationships: StreamFtpSinkRelationship[];
}
