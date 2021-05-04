import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name = '';
  lastName  = '';
  email = '';
  phoneNumber = '';
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

  constructor(private formBuilder: FormBuilder) {
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
      this.nameFormControl.valid && this.lastNameFormControl.valid &&
      this.usernameFormControl.valid && this.phoneNumberFormControl.valid) {
      console.log('data is ok');
      const userCredentials = {
        name: this.name,
        lastName: this.lastName,
        phone: this.phoneNumber,
        email: this.email,
        username: this.username,
        password: this.password
      };
      // this.authService.register(userCredentials);
    } else {
      console.log('data not ok');
    }
  }
}
