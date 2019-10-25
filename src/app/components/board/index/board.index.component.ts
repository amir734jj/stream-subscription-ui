import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../../services/board.service';
import {Question} from '../../../models/Question';
import {VoteService} from '../../../services/vote.service';
import {AuthenticationUtility} from '../../../utilities/authentication.utility';
import {SortKeyEnum} from '../../../models/enums/SortKeyEnum';
import {EnumValues} from 'enum-values';

@Component({
  selector: 'app-board',
  templateUrl: './board.index.component.html',
  styleUrls: ['./board.index.component.sass']
})
export class BoardIndexComponent implements OnInit {

  public SortKeyEnum = SortKeyEnum;
  public sortKey: SortKeyEnum = SortKeyEnum.None;

  constructor(private questionService: QuestionService, private voteService: VoteService, private authenticationUtility: AuthenticationUtility) { }

  keyword: string = '';
  questions: Array<Question>;

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestions(this.sortKey).subscribe(res => {
      this.questions = res;
    });
  }

  upVote(id: string) {
    this.voteService.upVote(id).subscribe(res => {
      this.getQuestions();
    });
  }

  downVote(id: string) {
    this.voteService.downVote(id).subscribe(res => {
      this.getQuestions();
    });
  }

  search() {
    this.questionService.search(this.keyword).subscribe(res => {
      this.questions = res;
    });
  }

  clear() {
    this.keyword = '';
    this.getQuestions();
  }

  setSortBy(sortKey: SortKeyEnum) {
    this.sortKey = sortKey;
    this.getQuestions();
  }

  getSortKeyName() {
    return EnumValues.getNameFromValue(SortKeyEnum, this.sortKey);
  }

  isAuthenticated() {
    return !!this.authenticationUtility.getAccount();
  }
}
