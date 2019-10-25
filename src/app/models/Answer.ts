import {Guid} from 'guid-typescript';

export class Answer {
  id: string;
  text: string;

  constructor() {
    this.id = Guid.create().toString();
  }
}
