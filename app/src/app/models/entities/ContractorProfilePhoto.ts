import AbstractEntity from './AbstractEntity';

export class ContractorProfilePhoto extends AbstractEntity {
  id: string;
  mimeType: string;
  base64: string;
  name: string;

  constructor() {
    super();
  }

  isNull() {
    return !!this.base64;
  }
}
