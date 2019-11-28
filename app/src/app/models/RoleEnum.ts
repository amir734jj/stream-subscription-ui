import { EnumValues } from 'enum-values';

export enum Role {
  InternalUser = 0,
  Contractor = 1,
  Homeowner = 2
}

const roleName = {
  InternalUser: 'Internal-user'
};

export const roles: {
  name: string,
  value: string | number
}[] = EnumValues.getNamesAndValues(Role).map(x => x.name in roleName ? {...x, name: roleName[x.name] } : x);
