import {Tag} from './Tag';
import {Guid} from 'guid-typescript';
import {Answer} from './Answer';

export class Question {
  id: string;
  title: string;
  text: string;
  tags: Tag[];
  answers: Answer[];
  vote: number;
  time: Date;

  constructor() {
    this.id = Guid.create().toString();
  }
}
