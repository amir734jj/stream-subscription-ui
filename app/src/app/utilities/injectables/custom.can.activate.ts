import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {RouteDataStrictType} from '../../types/router.data.type';
import {anyAuthInfo} from '../auth.utility';

@Injectable()
export class CustomCanActivate implements CanActivate {

  constructor(private router: Router) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const {allowAnonymous = false, disallowAuthenticated = false} = route.data as RouteDataStrictType;
    const {item1 = false} = anyAuthInfo();

    switch (item1) {
      case true:
        if (!allowAnonymous) {
          return true;
        } else if (disallowAuthenticated) {
          return await this.router.navigate(['./']);
        } else {
          return true;
        }
      case false:
        if (allowAnonymous || disallowAuthenticated) {
          return true;
        } else {
          await this.router.navigate(['./login']);
        }
    }
  }
}
