import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth/auth.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';
  username = '';


  myForm!: FormGroup;

  hide = true;
  phoneNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(15),
  ]);
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);
  usernameFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit(): void {
  }

  sendData() {
    if (this.myForm.valid && this.emailFormControl.valid &&
      this.usernameFormControl.valid) {
      console.log('data is ok');
      const userCredentials = {
        email: this.email,
        username: this.username,
        password: this.password
      };
      this.authService.signup(userCredentials);
    } else {
      console.log('data not ok');
    }
  }
}
