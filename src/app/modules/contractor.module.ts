import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContractorIndexComponent} from '../components/contractor/index/contractor.index.component';
import {ContractorSaveComponent} from '../components/contractor/save/contractor.save.component';
import {ContractorUpdateComponent} from '../components/contractor/update/contractor.update.component';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ContractorService} from '../services/contractor.service'; // this is needed!

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [ContractorService],
  declarations: [ContractorIndexComponent, ContractorSaveComponent, ContractorUpdateComponent],
  exports: [ContractorIndexComponent, ContractorSaveComponent, ContractorUpdateComponent]
})
export class ContractorModule {

}
