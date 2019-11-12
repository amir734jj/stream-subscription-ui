import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import Contractor from '../models/entities/Contractor';
import {ContractorProfilePhoto} from '../models/entities/ContractorProfilePhoto';

export enum ActionContext {
  UPDATE, SAVE
}

export const fileDropHandlerUtility = (ref: { contractor: Contractor }) => (files: NgxFileDropEntry[]) => (ctx: ActionContext) => {
  for (const droppedFile of files) {

    // Is it a file?
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {

        // Here you can access the real file
        console.log(droppedFile.relativePath, file);

        const reader = new FileReader();

        reader.onloadend = () => {
          // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
          const b64 = (reader.result as string);
          const payload = {
            mimeType: file.type,
            name: file.name,
            base64: b64
          };

          switch (ctx) {
            case ActionContext.UPDATE:
              ref.contractor.profilePhoto = Object.assign({}, ref.contractor.profilePhoto, payload);
              break;
            case ActionContext.SAVE:
              ref.contractor.profilePhoto = Object.assign({}, new ContractorProfilePhoto(), payload);
              ref.contractor.reset();
              break;
            default:
            // nothing ...
          }
        };

        reader.readAsDataURL(file);
      });
    } else {
      // It was a directory (empty directories are added, otherwise only files)
      const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      console.log(droppedFile.relativePath, fileEntry);
    }
  }
};
