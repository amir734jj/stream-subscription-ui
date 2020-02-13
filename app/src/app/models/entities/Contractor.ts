import User from './User';
import {SpecialityEnum} from '../SpecialityEnum';
import {AbstractUserEntity} from '../abstracts/AbstractUserEntity';
import {ShowcaseProject} from './ShowcaseProject';

export default class Contractor extends AbstractUserEntity {
  id: string;
  userRef: User = new User();
  speciality: SpecialityEnum[];
  showcaseProjects: ShowcaseProject[];

  name(): string {
    return this.userRef.name();
  }
}
