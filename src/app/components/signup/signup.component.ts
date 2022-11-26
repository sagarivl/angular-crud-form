import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { NgToastService } from 'ng-angular-popup';

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
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z].*')]],
    });
  }

  onsignUp() {
    this.api.signUp(this.signupForm.value).subscribe(
      (res) => {
        console.log(res);

        this.toast.success({
          detail: 'Success',
          summary: 'signup successfully',
        });
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      (err) => {}
    );
  }
}
