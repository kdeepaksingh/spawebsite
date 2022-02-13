import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Here i am using node js api

  BASE_URL: string = 'http://localhost:3000/posts';

  // Here i am setting header because by using this cors communicate with database.

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }

  postUserData(data: any) {
    return this.http.post<any>(`${this.BASE_URL}`, data).pipe(map((res: any) => {
      return res;
    }));
  }
  getUserData() {
    return this.http.get<any>(`${this.BASE_URL}`).pipe(map((res: any) => {
      return res;
    }));
  }
}
