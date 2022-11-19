import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  onsignUp() {
    this.api.signUp(this.signupForm.value).subscribe(
      (res) => {
        console.log(res);
        alert('signup successfully');
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      (err) => {
        alert('Something went wrong on signup');
      }
    );
  }
}
