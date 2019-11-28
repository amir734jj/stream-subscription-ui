import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxFileDropModule} from 'ngx-file-drop';
import {ProfileComponent} from '../components/profile/profile.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    NgxFileDropModule
  ],
  providers: [ ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {

}
