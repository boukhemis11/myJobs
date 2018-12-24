import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://localhost:4444/auth/';

  constructor(private router: Router, private http: Http) { }

  login(credentials) {
    return this.http.post(this.BASE_URL + 'login', credentials)
              .pipe(map(res => res.json()));
  }

  register(credentials) {
    console.log(credentials);
    return  this.http.post(this.BASE_URL + 'register', credentials)
              .pipe(map(res => res.json()));
  }

  userIsLoggedIn() {
    return localStorage.getItem('job-data');
  }

  logOut() {
    localStorage.removeItem('job-data');
    this.router.navigate(['/home']);
  }

  decodeToken(token) {
    jwtDecode(token);
  }
}
