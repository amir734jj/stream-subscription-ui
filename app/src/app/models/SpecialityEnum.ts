import {EnumToString, ResolveEnumNameTable} from '../utilities/enum.utility';

export enum SpecialityEnum {
  Electrician = 0,
  Plumber = 1
}

export const SpecialityNameTable = ResolveEnumNameTable(SpecialityEnum);

export const SpecialityToString = (speciality: SpecialityEnum): string => EnumToString(SpecialityNameTable, speciality);
