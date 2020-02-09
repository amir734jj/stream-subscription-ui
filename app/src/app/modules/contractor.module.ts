import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContractorIndexComponent} from '../components/contractor/index/contractor.index.component';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ContractorService} from '../services/contractor.service';
import {NgxFileDropModule} from 'ngx-file-drop';
import {ContractorBoardComponent} from "../components/contractor/board/contractor-board.component";
import {ContactContractorComponent} from "../components/contractor/contact/contact-contractor.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    NgxFileDropModule
  ],
  providers: [ContractorService],
  declarations: [ContractorIndexComponent, ContractorBoardComponent, ContactContractorComponent],
  exports: [ContractorIndexComponent, ContractorBoardComponent]
})
export class ContractorModule {

}
