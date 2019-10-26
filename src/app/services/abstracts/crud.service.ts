import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

export default abstract class CrudService<T> {

  private readonly apiUrl = environment.apiUrl;

  abstract resolveRoute(): string;
  abstract resolveHttpClient(): HttpClient;

  save(item: T) {
    return this.resolveHttpClient()
      .post<T>(this.resolveRoute(), item);
  }

  update(id: string, item: T) {
    return this.resolveHttpClient()
      .put<T>(`${this.resolveRoute()}/${id}`, item);
  }

  get(id: string) {
    return this.resolveHttpClient()
      .get<T>(`${this.resolveRoute()}/${id}`);
  }

  getAll() {
    return this.resolveHttpClient()
      .get<T[]>(this.resolveRoute());
  }

  delete(id: string) {
    return this.resolveHttpClient()
      .delete<boolean>(`${this.resolveRoute()}/${id}`);
  }
}
