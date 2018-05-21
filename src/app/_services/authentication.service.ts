import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthenticationService {
    private url = 'http://localhost:8080';
    loggedIn: boolean = false;

    constructor(private httpClient: Http ) { }

      getHeader() {
        const headers = new Headers();
        //headers.append('content-type', 'application/x-www-form-urlencoded');
        headers.append('content-type', 'application/json');
        return headers;
      }

    login(req: any): Observable<any> {
        const url = this.url + req.uri;
        const body = JSON.stringify(req.body);
        const requestOptions = new RequestOptions({
          headers: this.getHeader()
        });
        return this.httpClient.
          post(url, body, requestOptions)
          .map(res => {
            return res.json();
          });
    }

  post(req: any): Observable<any> {
    const url = this.url + req.uri;
    const body = JSON.stringify(req.body);
    const requestOptions = new RequestOptions({
      headers: this.getHeader()
    });
    return this.httpClient.
      post(url, body, requestOptions)
      .map(res => {
        return res.json();
      });
  }

  get(req: any): Observable<any> {
    const url = this.url + req.uri;
    const requestOptions = new RequestOptions({
      headers: this.getHeader()
    });
    return this.httpClient.get(url, requestOptions)
      .map(res => {
        return res.json();
      });
  }    

    logout() {
          this.loggedIn=false;         
    }

  getAuth() {
    return localStorage.getItem('authToken');
  }
  setAuth() {
    localStorage.setItem('authToken', 'true');
  }
  removeAuth() {
    localStorage.removeItem('authToken');
  }
  getUser() {
    return localStorage.getItem('user');
  }
  removeUser() {
    localStorage.removeItem('user');
  }
  setUser(user: string) {
    localStorage.setItem('user', user);
  }
      
}