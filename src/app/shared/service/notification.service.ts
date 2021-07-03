import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notiSource = new BehaviorSubject({});
  currentNoti = this.notiSource.asObservable();

  constructor() { }

  changeMessage = (noti: any) => {
    this.notiSource.next(noti);
  }
}
