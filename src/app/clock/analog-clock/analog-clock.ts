import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  imports: [CommonModule],
  templateUrl: './analog-clock.html',
  styleUrl: './analog-clock.css'
})
export class AnalogClock {
  @Input() time!: Date;

  hourMarks = Array.from({length: 12}, (_, i) => i * 30);

  get hourAngle(): number {
    return (this.time.getHours() % 12) * 30 + this.time.getMinutes() * 0.5;
  }

  get minuteAngle(): number {
    return this.time.getMinutes() * 6;
  }

  get secondAngle(): number {
    return this.time.getSeconds() * 6;
  }
}
