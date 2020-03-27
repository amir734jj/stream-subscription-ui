import {enumToString, resolveEnumNameTable} from '../../utilities/enum.utility';

export enum StreamStatus {
  Started,
  Stopped,
  Fail
}

export const StreamStatusNameTable = resolveEnumNameTable(StreamStatus);

export const statusToString = (status: StreamStatus): string => enumToString(StreamStatusNameTable, status);
