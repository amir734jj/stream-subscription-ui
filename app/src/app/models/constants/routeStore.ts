import {DetachedRouteHandle} from '@angular/router';
import { Map } from 'immutable';

export const routeStore = Map<string, DetachedRouteHandle>().asMutable();
