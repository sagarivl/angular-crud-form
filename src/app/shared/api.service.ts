import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  postInfo(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/posts`, data);
  }
  onUpdate(data: any, id: any): Observable<any> {
    //return this.http.put<any>(`http://localhost:3000/posts/${id}`, data);
    return this.http.put<any>(`${this.baseUrl}/posts/${id}`, data);
  }
  getInfo(): Observable<any> {
    //return this.http.get<any>('http://localhost:3000/posts');
    return this.http.get<any>(`${this.baseUrl}/posts`);
  }

  deleteInfo(id: any): Observable<any> {
    //return this.http.delete<any>(`http://localhost:3000/posts/${id}`);
    return this.http.delete<any>(`${this.baseUrl}/posts/${id}`);
  }
  signUp(data: any): Observable<any> {
    //return this.http.post<any>('http://localhost:3000/signupuser', data);
    return this.http.post<any>(`${this.baseUrl}/signupuser`, data);
  }
  login() {
    //return this.http.get<any>('http://localhost:3000/signupuser');
    return this.http.get<any>(`${this.baseUrl}/signupuser`);
  }
}
