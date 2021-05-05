import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {LoginResponse} from "../../model/LoginResponse.model";
import {map} from "rxjs/operators";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = false;
  userRole: any = undefined;


  constructor(private httpClient: HttpClient, private router: Router, private localStorage: LocalStorageService) { }

  signup(userCredentials: any) {
    this.httpClient.post('http://localhost:8080/api/auth/signup', userCredentials, { responseType: 'text' }).subscribe(() => {
        this.router.navigateByUrl('/');
    });
  }

  login(credentials: any): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      credentials).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);
      this.router.navigateByUrl('/');

      return true;
    }));
  }
}
