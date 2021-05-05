import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};
  hide = true;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  sendData() {
    const userCredentials = {
      username: this.credentials.username,
      password: this.credentials.password
    };

    console.log(userCredentials)

    this.authService.login(userCredentials).subscribe(data => {
      console.log("successful");
    });
  }
}
