import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BoardComponent} from '../components/board/board.component';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import {TabsModule} from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    NgxAudioPlayerModule,
    TabsModule
  ],
  providers: [],
  declarations: [BoardComponent],
  exports: [BoardComponent]
})
export class BoardModule {

}
