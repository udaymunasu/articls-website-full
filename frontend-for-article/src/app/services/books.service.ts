import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?q=programming&maxResults=40`).pipe(
      map(response => response['items'])
    );
  }
}
