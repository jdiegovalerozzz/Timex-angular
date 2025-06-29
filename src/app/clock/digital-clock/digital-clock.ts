import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-digital-clock',
  imports: [CommonModule],
  templateUrl: './digital-clock.html',
  styleUrl: './digital-clock.css',
  providers: [DatePipe]
})
export class DigitalClock {
 @Input() time!: Date;
}
