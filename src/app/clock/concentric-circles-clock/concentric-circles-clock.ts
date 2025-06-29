import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-concentric-circles-clock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="concentric-clock">
      <div class="circles-container">
        <div class="circle hours-circle">
          <div class="progress-fill" [style.background]="getHoursGradient()"></div>
        </div>
        
        <div class="circle minutes-circle">
          <div class="progress-fill" [style.background]="getMinutesGradient()"></div>
        </div>
        
        <div class="circle seconds-circle">
          <div class="progress-fill" [style.background]="getSecondsGradient()"></div>
        </div>
        
        <div class="center-dot"></div>
      </div>
      
      <div class="time-info">
        <div class="time-display">{{ time | date:'HH:mm:ss' }}</div>
        <div class="progress-info">
          <div class="progress-item">
            <span class="color-dot hours-dot"></span> Horas: {{ time.getHours() % 12 }}h ({{ (hourRotation / 3.6).toFixed(1) }}%)
          </div>
          <div class="progress-item">
            <span class="color-dot minutes-dot"></span> Minutos: {{ time.getMinutes() }}m ({{ (minuteRotation / 3.6).toFixed(1) }}%)
          </div>
          <div class="progress-item">
            <span class="color-dot seconds-dot"></span> Segundos: {{ time.getSeconds() }}s ({{ (secondRotation / 3.6).toFixed(1) }}%)
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .concentric-clock {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 1.5rem;
    }
    
    .circles-container {
      position: relative;
      width: 300px;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .circle {
      position: absolute;
      border-radius: 50%;
      background: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    
    .hours-circle {
      width: 100%;
      height: 100%;
      border: 8px solid #e0e0e0;
    }
    
    .minutes-circle {
      width: 200px;
      height: 200px;
      border: 6px solid #e0e0e0;
    }
    
    .seconds-circle {
      width: 100px;
      height: 100px;
      border: 4px solid #e0e0e0;
    }
    
    .progress-fill {
      position: absolute;
      width: 100%;
      height: 100%;
      transform-origin: center center;
    }
    
    .center-dot {
      position: absolute;
      width: 16px;
      height: 16px;
      background: #333;
      border-radius: 50%;
      z-index: 10;
    }
    
    .time-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .time-display {
      font-family: 'Courier New', monospace;
      font-size: 1.8rem;
      font-weight: bold;
      color: #4361ee;
    }
    
    .progress-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .progress-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
    }
    
    .color-dot {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    
    .hours-dot { background: #4361ee; }
    .minutes-dot { background: #f72585; }
    .seconds-dot { background: #4cc9f0; }
  `]
})
export class ConcentricCirclesClock {
  @Input() time!: Date;

  get hourRotation(): number {
    return (this.time.getHours() % 12) * 30 + this.time.getMinutes() * 0.5;
  }

  get minuteRotation(): number {
    return this.time.getMinutes() * 6;
  }

  get secondRotation(): number {
    return this.time.getSeconds() * 6;
  }

  getHoursGradient(): string {
    return `conic-gradient(#4361ee 0deg, #4361ee ${this.hourRotation}deg, transparent ${this.hourRotation}deg, transparent 360deg)`;
  }

  getMinutesGradient(): string {
    return `conic-gradient(#f72585 0deg, #f72585 ${this.minuteRotation}deg, transparent ${this.minuteRotation}deg, transparent 360deg)`;
  }

  getSecondsGradient(): string {
    return `conic-gradient(#4cc9f0 0deg, #4cc9f0 ${this.secondRotation}deg, transparent ${this.secondRotation}deg, transparent 360deg)`;
  }
}