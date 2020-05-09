import { mp3MimeType } from '../constants/mimeType';
import { base64StringToBlob } from 'blob-util';

export const toAudioUrl = (base64: string) => {
  return `data:${mp3MimeType};base64,${base64}`;
};

export const toAudioBlob = (base64: string) => {
  return base64StringToBlob(base64, mp3MimeType);
}