import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PersonalModel } from 'src/app/personalInfo.model';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  personalDetails!: FormGroup;
  peronaldetailObj: PersonalModel = new PersonalModel();
  allData: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}
  ngOnInit(): void {
    this.personalDetails = this.formbuilder.group({
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['male'],
      city: ['pune'],
    });
    this.getAllDetails();
  }
  postPersonalInfo() {
    this.peronaldetailObj.firstName = this.personalDetails.value.firstName;
    this.peronaldetailObj.email = this.personalDetails.value.email;
    this.peronaldetailObj.mobile = this.personalDetails.value.mobile;
    this.peronaldetailObj.gender = this.personalDetails.value.gender;
    this.peronaldetailObj.city = this.personalDetails.value.city;

    this.api.postInfo(this.peronaldetailObj).subscribe(
      (res) => {
        console.log(res);
        alert('info added successfully');
        this.personalDetails.reset();
        this.getAllDetails();
        let ref = document.getElementById('cancel');
        ref?.click();
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }
  getAllDetails() {
    this.api.getInfo().subscribe((res) => {
      console.log(res);
      this.allData = res;
    });
  }
  deletePersonalInfo(row: any) {
    console.log(row);
    this.api.deleteInfo(row.id).subscribe((res) => {
      alert('row deleted succesfully');
      this.getAllDetails();
    });
  }
  onSubmit() {
    console.log(this.personalDetails);
  }
}
