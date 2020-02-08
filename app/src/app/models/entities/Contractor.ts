import User from './User';
import {SpecialityEnum} from '../SpecialityEnum';

export default class Contractor {
  id: string;
  userRef: User;
  speciality: SpecialityEnum[];
}
