import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {RouteDataStrictType} from '../../types/router.data.type';
import {CachedAuthenticationService} from '../../services/cached.authentication.service';


@Injectable()
export class CustomCanActivate implements CanActivate {

  constructor(private router: Router, private cachedAuthenticationService: CachedAuthenticationService) {
  }

  async canActivate(
    {data}: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const {allowAnonymous = false, disallowAuthenticated = false} = data as RouteDataStrictType;
    const {authenticated} = this.cachedAuthenticationService.resolveAuthInfo();

    switch (authenticated) {
      case true:
        if (disallowAuthenticated) {
          return await this.router.navigate(['./']);
        } else if (!allowAnonymous) {
          return true;
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
