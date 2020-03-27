import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StreamService} from '../services/stream.service';
import {FtpSinkComponent} from '../components/ftpsink/index/ftp-sink.component';
import {CommonComponentModule} from './common.module';
import {FtpSinkService} from '../services/ftp.sink.service';
import {AddFtpSinkComponent} from '../components/ftpsink/add/add-ftp-sink.component';
import {EditFtpSinkComponent} from '../components/ftpsink/edit/edit-ftp-sink.component';
import {MatSelectModule} from '@angular/material/select'; // this is needed!

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    CommonComponentModule,
    MatSelectModule
  ],
  providers: [StreamService, FtpSinkService],
  declarations: [
    FtpSinkComponent,
    AddFtpSinkComponent,
    EditFtpSinkComponent
  ],
  exports: [FtpSinkComponent, AddFtpSinkComponent, EditFtpSinkComponent]
})
export class FtpSinkModule {

}

