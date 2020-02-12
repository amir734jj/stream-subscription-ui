import User from './User';
import {SpecialityEnum} from '../SpecialityEnum';
import {AbstractUserEntity} from '../abstracts/AbstractUserEntity';

export default class Contractor extends AbstractUserEntity {
  id: string;
  userRef: User;
  speciality: SpecialityEnum[];

  name(): string {
	  return this.userRef.name();
  }
}
