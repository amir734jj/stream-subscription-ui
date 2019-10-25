import {Component, OnInit} from '@angular/core';
import {Question} from '../../../models/Question';
import {QuestionService} from '../../../services/board.service';
import {Router} from '@angular/router';
import {TagUtility} from '../abstracts/tag.utility';

@Component({
  selector: 'app-question-save',
  templateUrl: './question.save.component.html',
  styleUrls: ['./question.save.component.sass']
})
export class QuestionSaveComponent extends TagUtility implements OnInit {

  public question: Question;

  constructor(private router: Router, private questionService: QuestionService) {
    super();
    this.question = new Question();
  }

  ngOnInit() { }

  handleSaveQuestion() {
    this.question.tags = this.resolveRawTags();
    this.questionService.saveQuestion(this.question)
      .subscribe(res => {
        this.router.navigate(['./']);
      });
  }
}
