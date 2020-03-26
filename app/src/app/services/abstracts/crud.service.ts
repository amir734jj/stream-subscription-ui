import {HttpClient} from '@angular/common/http';
import route from '../../utilities/route.utility';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';

export default abstract class CrudService<T> {

  abstract default(): T;

  abstract resolveRoute(): string;

  abstract resolveHttpClient(): HttpClient;

  save(item: T) {
    return this.resolveHttpClient()
      .post<T>(route(this.resolveRoute()), item);
  }

  update(id: string, item: T) {
    return this.resolveHttpClient()
      .put<T>(route(this.resolveRoute(), id), item);
  }

  get(id: string) {
    return this.resolveHttpClient()
      .get<T>(route(this.resolveRoute(), id))
      .pipe(map(x => _.merge(this.default(), x)))
  }

  getAll() {
    return this.resolveHttpClient()
      .get<T[]>(route(this.resolveRoute()))
      .pipe(map(l => l.map(x => _.merge(this.default(), x))))
  }

  delete(id: string) {
    return this.resolveHttpClient()
      .delete<boolean>(route(this.resolveRoute(), id));
  }
}
