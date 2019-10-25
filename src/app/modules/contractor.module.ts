import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionService} from '../services/board.service';
import {QuestionIndexComponent} from '../components/question/index/question.index.component';
import {QuestionSaveComponent} from '../components/question/save/question.save.component';
import {QuestionUpdateComponent} from '../components/question/update/question.update.component';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MarkdownModule} from 'ngx-markdown';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AnswerService} from '../services/answer.service'; // this is needed!

@NgModule({
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    MarkdownModule.forRoot()
  ],
  providers: [QuestionService, AnswerService],
  declarations: [QuestionIndexComponent, QuestionSaveComponent, QuestionUpdateComponent],
  exports: [QuestionIndexComponent, QuestionSaveComponent, QuestionUpdateComponent]
})
export class ContractorModule {

}
