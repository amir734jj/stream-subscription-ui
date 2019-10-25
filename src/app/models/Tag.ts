import {Guid} from 'guid-typescript';

export class Tag {
  id: string;
  text: string;

  constructor() {
    this.id = Guid.create().toString();
  }
}
