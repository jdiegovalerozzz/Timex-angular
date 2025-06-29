import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-day-clock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-day-container">
      <h3>Progreso del día</h3>
      <div class="progress-bar">
        <div class="progress" [style.width.%]="dayProgress"></div>
      </div>
      <div class="time-info">
        <span>{{ time | date:'HH:mm:ss' }}</span>
        <span>{{ dayProgress | number:'1.2-2' }}% del día completado</span>
      </div>
      <div class="milestones">
        <div class="milestone" *ngFor="let milestone of milestones" 
             [style.left.%]="milestone.position">
          <div class="time">{{ milestone.time }}</div>
          <div class="marker"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .progress-day-container {
      font-family: 'Arial', sans-serif;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 1.5rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h3 {
      color: #4361ee;
      margin-bottom: 1rem;
      text-align: center;
    }

    .progress-bar {
      width: 100%;
      height: 20px;
      background: #e9ecef;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .progress {
      height: 100%;
      background: linear-gradient(90deg, #4361ee, #3f37c9);
      transition: width 0.5s ease;
    }

    .time-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: #6c757d;
      margin-bottom: 1.5rem;
    }

    .milestones {
      position: relative;
      height: 40px;
      width: 100%;
    }

    .milestone {
      position: absolute;
      transform: translateX(-50%);
      text-align: center;
    }

    .milestone .time {
      font-size: 0.7rem;
      color: #6c757d;
      margin-bottom: 0.3rem;
    }

    .milestone .marker {
      width: 2px;
      height: 10px;
      background: #6c757d;
      margin: 0 auto;
    }
  `]
})
export class ProgressDayClock {
  @Input() time!: Date;

  milestones = [
    { time: '12 AM', position: 0 },
    { time: '3 AM', position: 12.5 },
    { time: '6 AM', position: 25 },
    { time: '9 AM', position: 37.5 },
    { time: '12 PM', position: 50 },
    { time: '3 PM', position: 62.5 },
    { time: '6 PM', position: 75 },
    { time: '9 PM', position: 87.5 },
    { time: '12 AM', position: 100 }
  ];

  get dayProgress(): number {
    const totalSecondsInDay = 24 * 60 * 60;
    const now = this.time;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const totalSecondsPassed = hours * 3600 + minutes * 60 + seconds;
    return (totalSecondsPassed / totalSecondsInDay) * 100;
  }
}