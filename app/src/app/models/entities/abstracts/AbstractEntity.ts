import {Guid} from 'guid-typescript';

abstract class AbstractEntity {
  id: string;

  protected constructor() {
    this.id = Guid.create().toString();
  }

  reset() {
    delete this.id;
  }
}

export default AbstractEntity;
