import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css'],
})
export class ModalPopupComponent implements OnInit {
  @Input() personalDetails!: FormGroup;
  @Input() showAddBtn!: boolean;
  @Input() showUpdateBtn!: boolean;
  @Output() PersonalInfo: EventEmitter<any> = new EventEmitter<any>();
  @Output() updatedata: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  postPersonalInfo() {
    //console.log('add called');
    this.PersonalInfo.emit();
  }
  updatePersondata() {
    // console.log('update called');
    this.updatedata.emit();
  }
}
