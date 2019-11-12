import {Guid} from 'guid-typescript';

abstract class AbstractEntity {
  id: string;

  protected constructor() {
    this.id = Guid.create().toString();
  }

  reset() {
    delete this.id;
  }

  abstract isNull();
}

export default AbstractEntity;
