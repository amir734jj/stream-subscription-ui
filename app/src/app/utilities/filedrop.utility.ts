import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';

export const fileDropHandlerUtility = (droppedFile: NgxFileDropEntry) => {
  // Is it a file?
  if (droppedFile.fileEntry.isFile) {
    const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

    let fileRef: File = null;
    fileEntry.file((file: File) => {

      // Here you can access the real file
      console.log(droppedFile.relativePath, file);

      fileRef = file;
    });

    return fileRef;
  } else {
    // It was a directory (empty directories are added, otherwise only files)
    const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
    console.log(droppedFile.relativePath, fileEntry);

    return null;
  }
};
