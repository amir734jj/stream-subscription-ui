import {EnumValues} from 'enum-values';
import * as _ from 'lodash';

export type EnumValueType = string | number;

export type EnumNameTableType = {
  name: string,
  value: EnumValueType
}[];

export function ResolveEnumNameTable<T extends EnumValueType>(enumDef: any,
                                                              overrideNameTable: { [key in T]?: string } = {}): EnumNameTableType {
  return EnumValues.getNamesAndValues(enumDef).map(x => ({...x, name: _.get(overrideNameTable, x.value, x.name)}));
}

export function EnumToString<T>(enumNameTable: EnumNameTableType, enumValue: EnumValueType): string {
  return _.chain(enumNameTable)
    .find(x => x.value === enumValue)
    .get('name')
    .value()
    .toString();
}
