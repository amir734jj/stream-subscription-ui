import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Contractor from '../../../models/entities/Contractor';
import {ContractorService} from '../../../services/contractor.service';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {Guid} from 'guid-typescript';
import {ContractorProfilePhoto} from '../../../models/entities/ContractorProfilePhoto';

@Component({
  selector: 'app-question-save',
  templateUrl: './contractor.save.component.html',
  styleUrls: ['./contractor.save.component.sass']
})
export class ContractorSaveComponent implements OnInit {

  constructor(private router: Router, private contractorService: ContractorService) {
    this.contractor = new Contractor();
  }

  public contractor: Contractor;

  public file: NgxFileDropEntry = null;

  ngOnInit() {
    this.contractor = new Contractor();
  }

  handleSaveContractor(event: Event) {
    event.preventDefault();

    this.contractorService.save(this.contractor)
      .subscribe(res => {
        this.router.navigate(['./']).then();
      });
  }

  public dropped(files: NgxFileDropEntry[]) {
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
            this.contractor.profilePhoto.mimeType = file.type;
            this.contractor.profilePhoto.name = file.name;
            this.contractor.profilePhoto.base64 = b64;

            this.contractor.reset();
          };

          reader.readAsDataURL(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    this.contractor.profilePhoto = null;
  }
}
