import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../../services/board.service';
import {Question} from '../../../models/Question';
import {ActivatedRoute, Router} from '@angular/router';
import {TagUtility} from '../abstracts/tag.utility';

@Component({
  selector: 'app-question-update',
  templateUrl: './question.update.component.html',
  styleUrls: ['./question.update.component.sass']
})
export class QuestionUpdateComponent extends TagUtility implements OnInit {

  public question: Question;

  constructor(private route: ActivatedRoute, private router: Router, private questionService: QuestionService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getQuestion(params.id);
    });
  }

  getQuestion(id: string) {
    this.questionService.getQuestion(id).subscribe(res => {
      this.question = res;
      this.setTags(this.question.tags);
    });
  }

  handleUpdateQuestion() {
    this.question.tags = this.resolveRawTags();
    this.questionService.updateQuestion(this.question)
      .subscribe(res => {
        this.router.navigate(['./']);
      });
  }
}
