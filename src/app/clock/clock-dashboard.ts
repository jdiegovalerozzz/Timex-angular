import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DigitalClock } from '../clock/digital-clock/digital-clock';
import { AnalogClock } from '../clock/analog-clock/analog-clock';
import { BinaryClock } from '../clock/binary-clock/binary-clock';
import { WordClock } from '../clock/word-clock/word-clock';
import { ClockService } from '../services/clock.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HexClock } from './hex-clock/hex-clock';
import { ProgressDayClock } from './progess-day-clock/progess-day-clock';
import { ConcentricCirclesClock } from './concentric-circles-clock/concentric-circles-clock';
import { DailyEnergyMeter } from './daily-energy-meter/daily-energy-meter';
import { DaySecondsCounter } from './day-seconds-counter/day-seconds-counter';
import { BarGraphClock } from './bar-graph-clock/bar-graph-clock';

@Component({
  selector: 'app-clock-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DigitalClock, 
    AnalogClock, 
    BinaryClock,
    WordClock,
    HexClock,
    ProgressDayClock,
    ConcentricCirclesClock,
    DailyEnergyMeter,
    DaySecondsCounter,
    BarGraphClock
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Visualizadores de Tiempo</h1>
      </div>

      <div class="controls-panel">
        <div class="control-group">
          <label><i class="fas fa-eye"></i> Tipo de reloj:</label>
          <select [(ngModel)]="selectedClock" class="styled-select">
            <option value="digital">Digital</option>
            <option value="analog">Analógico</option>
            <option value="binary">Binario</option>
            <option value="words">En Palabras</option>
            <option value="hex">Hexadecimal</option>
            <option value="bar">Barra de progreso</option>
            <option value="concentric">Circulos concentricos</option>
            <option value="energy">Barra de energia diaria</option>
            <option value="seconds">Contador de segundos</option>
            <option value="barGraph">Grafico de barras</option>
          </select>
        </div>

        <div class="control-group">
          <label><i class="fas fa-sliders-h"></i> Ajuste de tiempo:</label>
          <div class="slider-container">
            <span>-12h</span>
            <input type="range" [(ngModel)]="timeOffset" 
                  (input)="updateTime()"
                  min="-43200" max="43200" step="3600"
                  class="time-slider">
            <span>+12h</span>
          </div>
          <div class="time-info">
            <p>Ajuste actual: <strong>{{ timeOffset / 3600 }} horas</strong></p>
            <p>Hora mostrada: <strong>{{ currentTime | date:'mediumTime' }}</strong></p>
          </div>
        </div>
      </div>

      <div class="clock-display">
        <app-digital-clock *ngIf="selectedClock === 'digital'" [time]="currentTime" />
        <app-analog-clock *ngIf="selectedClock === 'analog'" [time]="currentTime" />
        <app-binary-clock *ngIf="selectedClock === 'binary'" [time]="currentTime" />
        <app-word-clock *ngIf="selectedClock === 'words'" [time]="currentTime" />
        <app-hex-clock *ngIf="selectedClock === 'hex'" [time]="currentTime"></app-hex-clock>
        <app-progress-day-clock *ngIf="selectedClock === 'bar'" [time]="currentTime"></app-progress-day-clock>
        <app-concentric-circles-clock *ngIf="selectedClock === 'concentric'" [time]="currentTime"></app-concentric-circles-clock>
        <app-daily-energy-meter *ngIf="selectedClock === 'energy'" [time]="currentTime"></app-daily-energy-meter>
        <app-day-seconds-counter *ngIf="selectedClock === 'seconds'" [time]="currentTime"></app-day-seconds-counter>
        <app-bar-graph-clock *ngIf="selectedClock === 'barGraph'" [time]="currentTime"></app-bar-graph-clock>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .logout-btn {
      background-color: #4361ee;
      color: white;
      border: none;
      padding: 0.7rem 1.5rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logout-btn:hover {
      background-color: #3f37c9;
    }

    .controls-panel {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      margin-bottom: 2rem;
      background-color: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    .control-group {
      flex: 1;
      min-width: 300px;
    }

    .styled-select {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 1rem;
      margin-top: 0.5rem;
    }

    .slider-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .time-slider {
      flex: 1;
      height: 6px;
      -webkit-appearance: none;
      background: #e9ecef;
      border-radius: 3px;
    }

    .time-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      background: #4361ee;
      border-radius: 50%;
      cursor: pointer;
    }

    .time-info {
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #6c757d;
    }

    .time-info strong {
      color: #2b2d42;
    }

    .clock-display {
      background-color: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      min-height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class ClockDashboard {
  currentTime: Date = new Date();
  selectedClock = 'digital';
  timeOffset = 0;
  private timeSubscription: any;

  constructor(
    private clockService: ClockService,
    private authService: AuthService,
    private router: Router
  ) {
    this.timeSubscription = this.clockService.currentTime$.subscribe(time => {
      this.currentTime = time;
    });
  }

  updateTime() {
    this.clockService.setTimeOffset(this.timeOffset);
  }

  handleLogout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout completado');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en logout:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }
}