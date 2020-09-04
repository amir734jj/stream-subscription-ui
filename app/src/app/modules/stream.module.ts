import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StreamComponent} from '../components/stream/index/stream.component';
import {StreamService} from '../services/stream.service';
import {AddStreamComponent} from '../components/stream/add/add-stream.component';
import {EditStreamComponent} from '../components/stream/edit/edit-stream.component';
import {CommonComponentModule} from './common.module';
import {ManageStreamComponent} from '../components/stream/manage/manage-stream.component';
import {ManageStreamService} from '../services/manage.stream.service';
import {ShoutcastComponent} from '../components/stream/shoutcast/shoutcast.component';
import {ShoutcastService} from '../services/shoutcast.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    CommonComponentModule
  ],
  providers: [StreamService, ManageStreamService, ShoutcastService],
  declarations: [
    StreamComponent,
    AddStreamComponent,
    EditStreamComponent,
    ManageStreamComponent,
    ShoutcastComponent,
  ],
  exports: [StreamComponent]
})
export class StreamModule {

}

