import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractorService} from '../../../services/contractor.service';
import Contractor from '../../../models/entities/Contractor';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
// import {resolveFile, ActionContext} from '../../../utilities/filedrop.utility';

@Component({
  selector: 'app-question-update',
  templateUrl: './contractor.update.component.html',
  styleUrls: ['./contractor.update.component.sass']
})
export class ContractorUpdateComponent implements OnInit {

  public contractor: Contractor;

  constructor(private route: ActivatedRoute, private router: Router, private contractorService: ContractorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getContractor(params.id);
    });
  }

  getContractor(id: string) {
    this.contractorService.get(id).subscribe(res => {
      this.contractor = res;
    });
  }

  handleUpdateContractor(event: Event) {
    event.preventDefault();

    this.contractorService.update(this.contractor.id, this.contractor)
      .subscribe(res => {
        this.router.navigate(['./']).then();
      });
  }

  public dropped(files: NgxFileDropEntry[]) {
    // resolveFile(this, files, ActionContext.UPDATE);
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    this.contractor.profilePhoto = null;
  }
}
