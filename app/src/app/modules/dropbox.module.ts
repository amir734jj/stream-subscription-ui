import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StreamService} from '../services/stream.service';
import {CommonComponentModule} from './common.module';
import {FtpSinkService} from '../services/ftp.sink.service';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DropboxComponent} from '../components/dropbox/dropbox.component'; // this is needed!

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    CommonComponentModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [StreamService, FtpSinkService],
  declarations: [
	  DropboxComponent,
  ],
  exports: [DropboxComponent]
})
export class DropboxModule {

}

