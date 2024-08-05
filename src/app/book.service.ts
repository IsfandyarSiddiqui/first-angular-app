import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';


@Injectable({
  providedIn: 'root'
})

export class BookService {
  // private apiUrl = 'http://localhost:5000/api/Books';
  private apiUrl = 'https://localhost:44376/api/Books';
  // private apiUrl = 'https://localhost:44362/api/Books';
  // private apiUrl = 'http://localhost:5000/api/Books';

  constructor(private http: HttpClient) { }

  getBooks = ():Observable<Book[]> => this.http.get<Book[]>(this.apiUrl);
  getBook = (id: number):Observable<Book> => this.http.get<Book>(`${this.apiUrl}/${id}`);
  addBook = (book: Book):Observable<Book> => this.http.post<Book>(this.apiUrl, book);
  updateBook = (id: number, book: Book): Observable<Book> => this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  deleteBook = (id: number): Observable<void> => this.http.delete<void>(`${this.apiUrl}/${id}`);
}
