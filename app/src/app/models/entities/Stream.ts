import User from './User';
import {StreamFtpSinkRelationship} from './StreamFtpSinkRelationship';

export class Stream {
  id: string;
  name: string;
  filter = 'advertisement';
  url: string;
  user: User;
  streamFtpSinkRelationships: StreamFtpSinkRelationship[] = [];
}
