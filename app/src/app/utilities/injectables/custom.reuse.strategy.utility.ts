// This impl. bases upon one that can be found in the router's test cases.
import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';
import {RouteDataStrictType} from '../../types/router.data.type';
import {Injectable} from '@angular/core';
import { routeStore } from '../../models/constants/routeStore';

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const { shouldReuse = false } = route.data as RouteDataStrictType;
    return shouldReuse;
  }

  store(route: ActivatedRouteSnapshot, handle: {}): void {
    if (route.data.shouldReuse && handle) {
      routeStore.set(route.routeConfig.path, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!routeStore.get(route.routeConfig.path);
  }

  retrieve(route: ActivatedRouteSnapshot): {} {
    if (!route.routeConfig) { return null; }
    return routeStore.get(route.routeConfig.path);
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const { shouldReuse = false } = future.data as RouteDataStrictType;
    return shouldReuse;
  }
}
