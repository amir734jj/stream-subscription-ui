import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';

export const resolveFile = async (droppedFile: NgxFileDropEntry) => {
  // Is it a file?
	if (!droppedFile.fileEntry.isFile) {
		return null;
	} else {
		const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

		return await new Promise<File>(resolve => fileEntry.file(resolve));
	}
};
