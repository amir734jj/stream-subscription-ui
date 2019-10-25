import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../../../services/board.service';
import {Question} from '../../../models/Question';
import {Answer} from '../../../models/Answer';
import {AnswerService} from '../../../services/answer.service';
import {VoteService} from '../../../services/vote.service';
import {AuthenticationUtility} from '../../../utilities/authentication.utility';

@Component({
  selector: 'app-question-index',
  templateUrl: './question.index.component.html',
  styleUrls: ['./question.index.component.sass']
})
export class QuestionIndexComponent implements OnInit {
  public question: Question;
  public answer: Answer;

  constructor(private route: ActivatedRoute, private router: Router, private questionService: QuestionService,
              private answerService: AnswerService, private voteService: VoteService,
              private authenticationUtility: AuthenticationUtility) {
    this.answer = new Answer();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getQuestion(params.id);
    });
  }

  getQuestion(id: string) {
    this.questionService.getQuestion(id).subscribe(res => {
      this.question = res;
    });
  }

  deleteQuestion() {
    this.questionService.deleteQuestion(this.question.id).subscribe(() => {
      this.router.navigate(['./']);
    });
  }

  submitAnswer() {
    this.answerService.submitAnswer(this.question.id, this.answer).subscribe(() => {
      this.router.navigate(['./']);
    });
  }

  gotoEditQuestion() {
    this.router.navigate([`./question/${this.question.id}/edit`]);
  }

  upVote() {
    this.voteService.upVote(this.question.id).subscribe(res => {
      this.getQuestion(this.question.id);
    });
  }

  downVote() {
    this.voteService.downVote(this.question.id).subscribe(res => {
      this.getQuestion(this.question.id);
    });
  }

  isAuthenticated() {
    return !!this.authenticationUtility.getAccount();
  }
}
