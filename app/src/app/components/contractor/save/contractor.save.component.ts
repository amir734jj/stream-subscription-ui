import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Contractor from '../../../models/Contractor';
import {ContractorService} from '../../../services/contractor.service';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';

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

  public files: NgxFileDropEntry[] = [];

  ngOnInit() {
  }

  handleSaveContractor(event: Event) {
    event.preventDefault();

    this.contractorService.save(this.contractor)
      .subscribe(res => {
        this.router.navigate(['./']).then();
      });
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
}
