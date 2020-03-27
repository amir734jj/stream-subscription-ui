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
import {MatSelectModule} from '@angular/material/select';
import {ManageFtpSinkComponent} from '../components/ftpsink/manage/manage-ftp-sink.component'; // this is needed!

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
    EditFtpSinkComponent,
    ManageFtpSinkComponent
  ],
  exports: [FtpSinkComponent, AddFtpSinkComponent, EditFtpSinkComponent, ManageFtpSinkComponent]
})
export class FtpSinkModule {

}

