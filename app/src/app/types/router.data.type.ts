import {Route} from '@angular/router';

export type RouterDataType = ({ allowAnonymous: boolean } | { requireAuthenticated: boolean });

export type RouteExtended = Route & { data: RouterDataType };

export type RoutesExtended = RouteExtended[];
