import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = false;
  userRole: any = undefined;


  constructor(private httpClient: HttpClient, private router: Router) { }

  signup(userCredentials: any) {
    // console.log(userCredentials);
    console.log(this.httpClient.post('http://localhost:8080/api/auth/signup', userCredentials, { responseType: 'text' }).subscribe(() => {
        this.router.navigateByUrl('/');
    }));
  }
}
