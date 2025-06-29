import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClockService {
  private currentTimeSubject = new BehaviorSubject<Date>(new Date());
  private timeOffset = 0;
  private intervalId: any;
  
  public currentTime$ = this.currentTimeSubject.asObservable();

  constructor() {
    this.startClock();
  }

  private startClock() {
    this.intervalId = setInterval(() => {
      const realTime = new Date();
      const adjustedTime = new Date(realTime.getTime() + this.timeOffset);
      this.currentTimeSubject.next(adjustedTime);
    }, 1000);
  }

  getCurrentTime(): Date {
    return this.currentTimeSubject.value;
  }

  setTimeOffset(seconds: number) {
    this.timeOffset = seconds * 1000;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
