import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};
  hide = true;
  registerSuccessMessage = '';
  isError!: boolean;

  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.registered != undefined && params.registered === 'true') {
        this.toastr.success('Signup successful!');
        this.registerSuccessMessage = 'Please activate your account!';
      }
    })
  }

  sendData() {
    const userCredentials = {
      username: this.credentials.username,
      password: this.credentials.password
    };

    console.log(userCredentials)

    this.authService.login(userCredentials).subscribe(data => {
      if(data) {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login successful!')
      } else {
        this.isError = true;
      }
    });
  }
}
