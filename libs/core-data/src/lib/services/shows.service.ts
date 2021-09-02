import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Show } from '@tv/api-interfaces';

export const BASE_URL = 'https://db-30x30.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  private model = 'shows';
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get<Show[]>(this.getUrl());
  }

  find(id: string) {
    return this.httpClient.get<Show>(this.getUrlById(id));
  }

  create(show: Show) {
    return this.httpClient.post<Show>(this.getUrl(), show);
  }

  update(show: Show) {
    return this.httpClient.patch<Show>(this.getUrlById(show.id), show);
  }

  delete(showId: string) {
    return this.httpClient
      .delete<string>(this.getUrlById(showId))
      .pipe(mapTo(showId));
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  private getUrlById(id: string) {
    return `${this.getUrl()}/${id}`;
  }
}
