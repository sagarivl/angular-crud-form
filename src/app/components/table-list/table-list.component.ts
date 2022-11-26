import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Input() allData!: any[];
  filterTerm!: string;
  p: number = 1;
  constructor() {}

  ngOnInit(): void {}

  onEdit(row: any) {
    this.notify.emit(row);
  }
  deletePersonalInfo(row: any) {
    this.delete.emit(row);
  }
}
