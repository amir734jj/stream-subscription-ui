import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StreamComponent} from '../components/stream/index/stream.component';
import {StreamService} from '../services/stream.service';
import {FtpsinkComponent} from '../components/ftpsink/ftpsink.component';
import {AddStreamComponent} from '../components/stream/add/add-stream.component';
import {UpdateStreamComponent} from '../components/stream/update/update-stream.component'; // this is needed!

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [StreamService],
  declarations: [
    StreamComponent,
    FtpsinkComponent,
    AddStreamComponent,
    UpdateStreamComponent
  ],
  exports: [StreamComponent]
})
export class StreamModule {

}
