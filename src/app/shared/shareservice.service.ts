import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareserviceService {
  counter = 1;
  count: BehaviorSubject<number>;
  constructor() {
    this.count = new BehaviorSubject(this.counter);
  }
  nextCount() {
    this.count.next(++this.counter);
  }
}
