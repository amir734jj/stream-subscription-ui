import {EnumToString, ResolveEnumNameTable} from '../utilities/enum.utility';

export enum Role {
  InternalUser = 0,
  Contractor = 1,
  Homeowner = 2
}


export const RoleNameTable = ResolveEnumNameTable(Role, {
  // Here is the place to override names
  [Role.InternalUser]: 'Internal-User'
});

export const RoleToString = (role: Role): string => EnumToString(RoleNameTable, role);
