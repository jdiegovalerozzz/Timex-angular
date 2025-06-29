import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-word-clock',
  standalone: true,
  template: `
    <div class="word-clock">
      <div class="time-display">
        {{ timePhrase }}
      </div>
    </div>
  `,
  styles: [`
    .word-clock {
      font-family: 'Arial', sans-serif;
      text-align: center;
      padding: 2rem;
    }
    
    .time-display {
      font-size: 2.5rem;
      font-weight: bold;
      color: #333;
      line-height: 1.4;
      background: linear-gradient(135deg, #4361ee, #3f37c9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding: 1rem;
      border-radius: 10px;
      background-color: #f8f9fa;
    }
  `]
})
export class WordClock {
  @Input() time: Date = new Date();

  hoursWords = [
    'doce', 'una', 'dos', 'tres', 'cuatro', 'cinco', 
    'seis', 'siete', 'ocho', 'nueve', 'diez', 'once'
  ];

  minutesWords = [
    'en punto', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 
    'seis', 'siete', 'ocho', 'nueve', 'diez',
    'once', 'doce', 'trece', 'catorce', 'quince',
    'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte',
    'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco',
    'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve', 'treinta',
    'treinta y uno', 'treinta y dos', 'treinta y tres', 'treinta y cuatro', 'treinta y cinco',
    'treinta y seis', 'treinta y siete', 'treinta y ocho', 'treinta y nueve', 'cuarenta',
    'cuarenta y uno', 'cuarenta y dos', 'cuarenta y tres', 'cuarenta y cuatro', 'cuarenta y cinco',
    'cuarenta y seis', 'cuarenta y siete', 'cuarenta y ocho', 'cuarenta y nueve', 'cincuenta',
    'cincuenta y uno', 'cincuenta y dos', 'cincuenta y tres', 'cincuenta y cuatro', 'cincuenta y cinco',
    'cincuenta y seis', 'cincuenta y siete', 'cincuenta y ocho', 'cincuenta y nueve'
  ];

  get timePhrase(): string {
    const hours = this.time.getHours();
    const minutes = this.time.getMinutes();
    const twelveHour = hours % 12;
    const hourIndex = twelveHour;

    if (minutes === 0) {
      if (hours === 0) return 'Medianoche';
      if (hours === 12) return 'Mediodía';
    }

    if (minutes === 0) {
      if (hourIndex === 1) return `Es la una en punto`;
      if (hourIndex === 0) return `Son las doce en punto`;
      return `Son las ${this.hoursWords[hourIndex]} en punto`;
    } else {
      if (hourIndex === 1) return `Es la una y ${this.minutesWords[minutes]}`;
      if (hourIndex === 0) return `Son las doce y ${this.minutesWords[minutes]}`;
      return `Son las ${this.hoursWords[hourIndex]} y ${this.minutesWords[minutes]}`;
    }
  }
}