import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  login() {
    this.api.login().subscribe(
      (res) => {
        const userInfo = res.find(
          (user: any) =>
            user.email === this.loginForm.value.email &&
            user.password === this.loginForm.value.password
        );
        if (userInfo) {
          //alert('login successfully');
          this.toast.success({
            detail: 'Success',
            summary: 'login successfully',
          });
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        } else {
          //alert('User not found');
          this.toast.error({
            detail: 'Error',
            summary: 'User not found',
          });
          this.loginForm.reset();
        }
      },
      (err) => {
        //alert('Something went wrong on login');
        this.toast.error({
          detail: 'Error',
          summary: 'Login Failed',
        });
      }
    );
  }
}
