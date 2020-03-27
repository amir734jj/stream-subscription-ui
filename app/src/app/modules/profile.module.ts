import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxFileDropModule} from 'ngx-file-drop';
import {ProfileComponent} from '../components/profile/index/profile.component';
import {ProfileService} from '../services/profile.service';
import {AccountModule} from './account.module';
import {MatSelectModule} from '@angular/material/select';
import {CommonComponentModule} from './common.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    NgxFileDropModule,
    AccountModule,
    MatSelectModule,
    CommonComponentModule
  ],
  providers: [ProfileService],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {

}
