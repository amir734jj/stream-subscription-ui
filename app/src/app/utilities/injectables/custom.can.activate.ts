import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {RouteDataStrictType} from '../../types/router.data.type';
import {anyAuthInfo} from '../auth.utility';

@Injectable()
export class CustomCanActivate implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { allowAnonymous = false, disallowAuthenticated = false } = route.data as RouteDataStrictType;
    const { item1 = false } = anyAuthInfo();

    switch (item1) {
      case true:
        if (!allowAnonymous) {
          return true;
        } else { return !disallowAuthenticated; }
      case false:
        return allowAnonymous || disallowAuthenticated;
    }
  }
}
