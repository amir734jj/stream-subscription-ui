import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ContractorService} from '../../services/contractor.service';
import {NgxFileDropEntry} from 'ngx-file-drop';
import {ActionContext, fileDropHandlerUtility} from '../../utilities/filedrop.utility';
import {ContractorProfilePhoto} from '../../models/entities/ContractorProfilePhoto';
import {Profile} from '../../models/entities/Profile';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private profileService: ProfileService) {
    this.profile = new Profile();
  }

  public profile: Profile;

  public file: NgxFileDropEntry = null;

  ngOnInit() {
    this.profileService.get().subscribe(profile => {
      this.profile = profile;
    });
  }

  handleSaveContractor(event: Event) {
    event.preventDefault();

    // this.profileService.save(this.profile)
    //   .subscribe(res => {
    //     this.router.navigate(['./']).then();
    //   });
  }

  public dropped(files: NgxFileDropEntry[]) {
    // fileDropHandlerUtility(this, files, ActionContext.SAVE);
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    // this.contractor.profilePhoto = null;
  }

  deleteImage() {
    // this.contractoror.profilePhoto = new ContractorProfilePhoto();
  }
}
