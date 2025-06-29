import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar-graph-clock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bar-graph-clock">
      <h3>Reloj Gráfico de Barras</h3>
      
      <div class="graph-container">
        <div class="bar-section">
          <div class="bar-label">Horas</div>
          <div class="bar-container">
            <div class="bar hours-bar" [style.height.%]="hoursPercentage"></div>
          </div>
          <div class="bar-value">{{ time.getHours() }}h</div>
        </div>
        
        <div class="bar-section">
          <div class="bar-label">Minutos</div>
          <div class="bar-container">
            <div class="bar minutes-bar" [style.height.%]="minutesPercentage"></div>
          </div>
          <div class="bar-value">{{ time.getMinutes() }}m</div>
        </div>
        
        <div class="bar-section">
          <div class="bar-label">Segundos</div>
          <div class="bar-container">
            <div class="bar seconds-bar" [style.height.%]="secondsPercentage"></div>
          </div>
          <div class="bar-value">{{ time.getSeconds() }}s</div>
        </div>
      </div>
      
      <div class="digital-display">{{ time | date:'HH:mm:ss' }}</div>
    </div>
  `,
  styles: [`
    .bar-graph-clock {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      font-family: 'Arial', sans-serif;
      max-width: 500px;
      margin: 0 auto;
    }
    
    h3 {
      color: #4361ee;
      margin: 0;
    }
    
    .graph-container {
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 200px;
      gap: 1.5rem;
    }
    
    .bar-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      gap: 0.5rem;
    }
    
    .bar-label {
      font-size: 1rem;
      color: #6c757d;
    }
    
    .bar-container {
      height: 100%;
      width: 50px;
      background: #e9ecef;
      border-radius: 5px 5px 0 0;
      display: flex;
      align-items: flex-end;
      position: relative;
      overflow: hidden;
    }
    
    .bar {
      width: 100%;
      transition: height 0.5s ease;
    }
    
    .hours-bar {
      background: linear-gradient(to top, #4361ee, #3a0ca3);
    }
    
    .minutes-bar {
      background: linear-gradient(to top, #f72585, #b5179e);
    }
    
    .seconds-bar {
      background: linear-gradient(to top, #4cc9f0, #4895ef);
    }
    
    .bar-value {
      font-weight: bold;
      color: #2b2d42;
    }
    
    .digital-display {
      font-family: 'Courier New', monospace;
      font-size: 1.2rem;
      color: #6c757d;
      margin-top: 1rem;
    }
  `]
})
export class BarGraphClock implements OnInit, OnDestroy {
  @Input() time!: Date;
  hoursPercentage = 0;
  minutesPercentage = 0;
  secondsPercentage = 0;
  private intervalId: any;

  ngOnInit() {
    this.updateBars();
    this.intervalId = setInterval(() => this.updateBars(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateBars() {
    if (!this.time) return;
    
    this.hoursPercentage = (this.time.getHours() / 23) * 100;
    
    this.minutesPercentage = (this.time.getMinutes() / 59) * 100;
    
    this.secondsPercentage = (this.time.getSeconds() / 59) * 100;
  }
}