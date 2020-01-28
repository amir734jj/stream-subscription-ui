import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Contractor from '../../../models/entities/Contractor';
import {ContractorService} from '../../../services/contractor.service';
import {NgxFileDropEntry} from 'ngx-file-drop';
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
    // fileDropHandlerUtility(this, files, ActionContext.SAVE);
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    this.contractor.profilePhoto = null;
  }

  deleteImage() {
    this.contractor.profilePhoto = new ContractorProfilePhoto();
  }
}
