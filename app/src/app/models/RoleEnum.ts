import { EnumValues } from 'enum-values';

export enum Role {
  InternalUser = 0,
  Contractor = 1,
  Homeowner = 2
}

export const roles = EnumValues.getNamesAndValues(Role);
