import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BoardComponent} from '../components/board/board.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FavoriteService} from '../services/favorite.service';
import {MediaSessionUtility} from '../utilities/injectables/mediaSession.utility';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    TabsModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  providers: [FavoriteService, MediaSessionUtility],
  declarations: [BoardComponent],
  exports: [BoardComponent]
})
export class BoardModule {

}
