import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import route from '../../utilities/route.utility';

export default abstract class CrudService<T> {

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
      .get<T>(route(this.resolveRoute(), id));
  }

  getAll() {
    return this.resolveHttpClient()
      .get<T[]>(route(this.resolveRoute()));
  }

  delete(id: string) {
    return this.resolveHttpClient()
      .delete<boolean>(route(this.resolveRoute(), id));
  }
}
