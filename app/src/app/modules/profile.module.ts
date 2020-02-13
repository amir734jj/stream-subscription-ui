import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxFileDropModule} from 'ngx-file-drop';
import {ProfileComponent} from '../components/profile/index/profile.component';
import {ProfileService} from '../services/profile.service';
import {ImageService} from '../services/image.service';
import {AccountModule} from './account.module';
import {ContractorProfileComponent} from '../components/profile/contractor/index/contractor-profile.component';
import {MatSelectModule} from '@angular/material/select';
import {ShowcaseProjectComponent} from '../components/profile/contractor/showcase/showcase-project.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    NgxFileDropModule,
    AccountModule,
    MatSelectModule
  ],
  providers: [ProfileService, ImageService],
  declarations: [ProfileComponent, ContractorProfileComponent, ShowcaseProjectComponent],
  exports: [ProfileComponent, ShowcaseProjectComponent]
})
export class ProfileModule {

}
