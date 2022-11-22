import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postInfo(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/posts', data);
  }
  onUpdate(data: any, id: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/posts/${id}`, data);
  }
  getInfo(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/posts');
  }

  deleteInfo(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/posts/${id}`);
  }
  signUp(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/signupuser', data);
  }
  login() {
    return this.http.get<any>('http://localhost:3000/signupuser');
  }
}
