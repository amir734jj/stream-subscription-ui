import { Injectable } from '@angular/core';
import {DetachedRouteHandle} from '@angular/router';
import { Map } from 'immutable';

@Injectable({
  providedIn: 'root',
})
export class RouteStoreUtility {
  public store = Map<string, DetachedRouteHandle>();

  destroyAll() {
    this.store.forEach((handle: any) => {
      if (handle && handle.componentRef) {
        handle.componentRef.destroy();
      }
    });
    this.store = this.store.clear();
  }
}
