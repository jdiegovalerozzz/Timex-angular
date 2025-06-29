import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-binary-clock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="binary-clock">
      <div class="binary-display">
        <div class="binary-column">
          <div class="binary-label">H</div>
          <div *ngFor="let bit of binaryHours; let i = index" 
               class="binary-cell" 
               [class.active]="bit === '1'"
               [title]="'Bit ' + (5 - i) + ': ' + bit"></div>
        </div>
        
        <div class="binary-column">
          <div class="binary-label">M</div>
          <div *ngFor="let bit of binaryMinutes; let i = index" 
               class="binary-cell" 
               [class.active]="bit === '1'"
               [title]="'Bit ' + (5 - i) + ': ' + bit"></div>
        </div>
        
        <div class="binary-column">
          <div class="binary-label">S</div>
          <div *ngFor="let bit of binarySeconds; let i = index" 
               class="binary-cell" 
               [class.active]="bit === '1'"
               [title]="'Bit ' + (5 - i) + ': ' + bit"></div>
        </div>
      </div>
      
      <div class="binary-time">
        {{ time | date:'HH:mm:ss' }}
      </div>
    </div>
  `,
  styles: [`
    .binary-clock {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      font-family: 'Courier New', monospace;
    }
    
    .binary-display {
      display: flex;
      gap: 2rem;
    }
    
    .binary-column {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
    }
    
    .binary-label {
      font-weight: bold;
      font-size: 1.2rem;
      color: #4361ee;
    }
    
    .binary-cell {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #e9ecef;
      transition: all 0.3s ease;
    }
    
    .binary-cell.active {
      background: #4361ee;
      transform: scale(1.1);
      box-shadow: 0 0 8px rgba(67, 97, 238, 0.5);
    }
    
    .binary-time {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2b2d42;
    }
  `]
})
export class BinaryClock implements OnChanges {
  @Input() time!: Date;
  
  binaryHours: string[] = [];
  binaryMinutes: string[] = [];
  binarySeconds: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['time']) {
      this.updateBinaryValues();
    }
  }

  private updateBinaryValues(): void {
    this.binaryHours = this.toBinaryArray(this.time.getHours());
    this.binaryMinutes = this.toBinaryArray(this.time.getMinutes());
    this.binarySeconds = this.toBinaryArray(this.time.getSeconds());
  }

  private toBinaryArray(value: number): string[] {
    return value.toString(2).padStart(6, '0').split('');
  }
}