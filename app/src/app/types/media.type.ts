import {SongMetadata} from './song.metadata.type';

export type MediaType = {
  name: string;
  fullName: string;
  source: string;
  audio: string;
  filename: string;
  index: number;
  formattedDuration: string;
} & SongMetadata;
