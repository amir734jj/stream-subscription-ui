import AbstractEntity from './AbstractEntity';
import {ContractorProfilePhoto} from './ContractorProfilePhoto';

export default class Contractor extends AbstractEntity {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  profilePhoto: ContractorProfilePhoto;

  constructor() {
    super();
    this.profilePhoto = new ContractorProfilePhoto();
  }

  reset() {
    super.reset();
    this.profilePhoto.reset();
  }
}
