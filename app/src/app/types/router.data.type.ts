export type RouteDataType =
  { allowAnonymous: boolean }
  | { disallowAuthenticated: boolean }
  | { shouldReuse: boolean };

export type RouteDataStrictType =
  { allowAnonymous: boolean }
  & { disallowAuthenticated: boolean }
  & { shouldReuse: boolean };

export type RoutesDataType = RouteDataType[];
