import { EnumValues } from 'enum-values';

export enum Role {
  InternalUser = 0,
  Contractor = 1,
  Homeowner = 2
}

const roleName = {
  [Role.InternalUser]: 'Internal-User',
  [Role.Contractor]: 'Contractor',
	[Role.Homeowner]: 'Homeowner',
};

export const Roles: {
  name: string,
  value: string | number
}[] = EnumValues.getNamesAndValues(Role).map(x => ({...x, name: roleName[x.value] }));
