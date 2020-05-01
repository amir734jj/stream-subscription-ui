import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BoardComponent} from '../components/board/board.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FavoriteService} from '../services/favorite.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    TabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  providers: [FavoriteService],
  declarations: [BoardComponent],
  exports: [BoardComponent]
})
export class BoardModule {

}
