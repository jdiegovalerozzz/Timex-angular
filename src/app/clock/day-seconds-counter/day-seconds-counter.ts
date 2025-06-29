import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-seconds-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="seconds-counter">
      <div class="counter-display">
        <span class="number">{{ totalSeconds | number:'1.0-0' }}</span>
        <span class="label">segundos transcurridos hoy</span>
      </div>
      <div class="time-reference">{{ currentTime }}</div>
    </div>
  `,
  styles: [`
    .seconds-counter {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      font-family: 'Courier New', monospace;
    }
    
    .counter-display {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #4361ee;
    }
    
    .label {
      font-size: 1rem;
      color: #6c757d;
    }
    
    .time-reference {
      font-size: 0.9rem;
      color: #adb5bd;
    }
  `]
})
export class DaySecondsCounter implements OnInit, OnDestroy {
  @Input() time!: Date;
  totalSeconds = 0;
  currentTime = '';
  private intervalId: any;

  ngOnInit() {
    this.updateCounter();
    this.intervalId = setInterval(() => this.updateCounter(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCounter() {
    if (!this.time) return;
    
    this.currentTime = this.time.toLocaleTimeString();
    const startOfDay = new Date(
      this.time.getFullYear(),
      this.time.getMonth(),
      this.time.getDate()
    );
    this.totalSeconds = Math.floor((this.time.getTime() - startOfDay.getTime()) / 1000);
  }
}