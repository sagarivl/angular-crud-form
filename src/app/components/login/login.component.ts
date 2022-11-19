import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
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
          alert('login successfully');
          this.loginForm.reset();
          this.router.navigate(['navbar']);
        } else {
          alert('User not found');
          this.loginForm.reset();
        }
      },
      (err) => {
        alert('Something went wrong on login');
      }
    );
  }
}
