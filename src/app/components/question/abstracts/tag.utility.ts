import {Tag} from '../../../models/Tag';
import {Guid} from 'guid-typescript';

export class TagUtility {

  private originalTags: Tag[];
  public tags: { value: string; display: string }[];

  constructor() {
    this.originalTags = [];
    this.tags = [];
  }

  resolveRawTags(): Tag[] {
    return this.tags.map((x) => {
      const id = Guid.isGuid(x.value) ? x.value : Guid.create().toString();

      return {id: id, text: x.display};
    });
  }

  setTags(tags: Tag[]) {
    this.originalTags = tags;
    this.tags = tags.map(x => {
      return {
        value: x.id,
        display: x.text
      };
    });
  }
}
