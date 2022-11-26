import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../shared/api.service';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { PersonalModel } from '../../model/personalInfo.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  personalDetails!: FormGroup;
  peronaldetailObj: PersonalModel = new PersonalModel();
  allData!: any;
  showUpdateBtn!: boolean;
  showAddBtn!: boolean;

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private toast: NgToastService,
    private confirmService: NgConfirmService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.personalDetails = this.formbuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z].*')]],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]*'),
        ],
      ],
      gender: ['male'],
      city: ['pune'],
    });
    this.getAllDetails();
  }
  //forms get info fields

  postPersonalInfo() {
    this.peronaldetailObj.firstName = this.personalDetails.value.firstName;
    this.peronaldetailObj.email = this.personalDetails.value.email;
    this.peronaldetailObj.mobile = this.personalDetails.value.mobile;
    this.peronaldetailObj.gender = this.personalDetails.value.gender;
    this.peronaldetailObj.city = this.personalDetails.value.city;

    this.api.postInfo(this.peronaldetailObj).subscribe(
      (res) => {
        console.log(res);

        this.toast.success({
          detail: 'Success',
          summary: 'Record added successfully',
        });
        this.personalDetails.reset();
        this.getAllDetails();
        let ref = document.getElementById('cancel');
        ref?.click();
      },
      (err) => {}
    );
  }
  getAllDetails() {
    this.api.getInfo().subscribe(
      (res) => {
        console.log(res);
        this.allData = res;
      },
      (err) => {}
    );
  }
  deletePersonalInfo(row: any) {
    this.confirmService.showConfirm(
      'Are you sure want to Delete?',
      () => {
        //your logic if Yes clicked
        this.api.deleteInfo(row.id).subscribe(() => {
          this.toast.success({
            detail: 'Success',
            summary: 'row deleted successfully',
          });
          this.getAllDetails();
        });
      },
      () => {
        //yor logic if No clicked
      }
    );
  }
  clickAddInfoBtn() {
    this.showUpdateBtn = false;
    this.showAddBtn = true;
  }
  onEdit(row: any) {
    this.showUpdateBtn = true;
    this.showAddBtn = false;
    this.peronaldetailObj.id = row.id;
    this.personalDetails.controls['firstName'].setValue(row.firstName);
    this.personalDetails.controls['email'].setValue(row.email);
    this.personalDetails.controls['mobile'].setValue(row.mobile);
    this.personalDetails.controls['gender'].setValue(row.gender);
    this.personalDetails.controls['city'].setValue(row.city);
  }
  updatePersondata() {
    this.peronaldetailObj.firstName = this.personalDetails.value.firstName;
    this.peronaldetailObj.email = this.personalDetails.value.email;
    this.peronaldetailObj.mobile = this.personalDetails.value.mobile;
    this.peronaldetailObj.gender = this.personalDetails.value.gender;
    this.peronaldetailObj.city = this.personalDetails.value.city;
    this.api
      .onUpdate(this.peronaldetailObj, this.peronaldetailObj.id)
      .subscribe((res) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Record Updated successfully',
        });
        this.personalDetails.reset();
        this.getAllDetails();
        let ref = document.getElementById('cancel');
        ref?.click();
      });
  }
  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['login']);
  }
  onSubmit() {
    //console.log(this.personalDetails);
  }
}
