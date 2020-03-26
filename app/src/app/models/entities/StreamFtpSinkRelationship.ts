import {Stream} from './Stream';
import {FtpSink} from './FtpSink';

export class StreamFtpSinkRelationship {
  id: string;
  stream: Stream;
  ftpSink: FtpSink;
}
