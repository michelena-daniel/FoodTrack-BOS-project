import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/auth/store/auth.actions';
import {Store} from '@ngxs/store'
import { MailValidator } from 'src/app/auth/validators/mail.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid) {
      this.store.dispatch(new Login(this.validateForm.value))
    }
  }

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, MailValidator]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
