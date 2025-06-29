import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hex-clock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hex-clock" [style.background]="backgroundColor">
      <div class="hex-display">
        <div class="hex-part hours" [style.color]="hoursColor">
          {{ hoursHex }}
        </div>
        <div class="hex-separator">:</div>
        <div class="hex-part minutes" [style.color]="minutesColor">
          {{ minutesHex }}
        </div>
        <div class="hex-separator">:</div>
        <div class="hex-part seconds" [style.color]="secondsColor">
          {{ secondsHex }}
        </div>
      </div>
      <div class="decimal-display">
        {{ time | date:'HH:mm:ss' }}
      </div>
    </div>
  `,
  styles: [`
    .hex-clock {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      border-radius: 10px;
      background: #1a1a2e;
      color: white;
      font-family: 'Courier New', monospace;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    
    .hex-display {
      display: flex;
      align-items: center;
      font-size: 3.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    
    .hex-part {
      padding: 0 0.5rem;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.1);
    }
    
    .hours { color: #4cc9f0; }
    .minutes { color: #f72585; }
    .seconds { color: #b5179e; }
    
    .hex-separator {
      margin: 0 0.3rem;
      color: #f8f9fa;
    }
    
    .decimal-display {
      font-size: 1.2rem;
      color: #adb5bd;
    }
  `]
})
export class HexClock {
  @Input() time!: Date;
  @Input() backgroundColor: string = '#1a1a2e';
  @Input() hoursColor: string = '#4cc9f0';
  @Input() minutesColor: string = '#f72585';
  @Input() secondsColor: string = '#b5179e';

  get hoursHex(): string {
    return this.time.getHours().toString(16).padStart(2, '0').toUpperCase();
  }

  get minutesHex(): string {
    return this.time.getMinutes().toString(16).padStart(2, '0').toUpperCase();
  }

  get secondsHex(): string {
    return this.time.getSeconds().toString(16).padStart(2, '0').toUpperCase();
  }
}