import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-energy-meter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="energy-meter">
      <div class="meter-header">
        <h3>Energía diaria</h3>
        <span class="energy-percent"
          >{{ remainingEnergy | number : '1.1-1' }}%</span
        >
      </div>

      <div class="meter-container">
        <div class="meter-bar" [style.width.%]="remainingEnergy"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .energy-meter {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        font-family: 'Arial', sans-serif;
        max-width: 400px;
      }

      .meter-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
        padding: 0 0.5rem;
      }

      .meter-header h3 {
        margin: 0;
        color: #2b2d42;
        white-space: nowrap;
      }

      .energy-percent {
        font-weight: bold;
        color: #4361ee;
        min-width: 60px;
        text-align: right;
      }

      .meter-container {
        height: 30px;
        background: #e9ecef;
        border-radius: 15px;
        overflow: hidden;
        margin-top: 0.5rem;
      }

      .meter-bar {
        height: 100%;
        background: linear-gradient(90deg, #4cc9f0, #4361ee);
        transition: width 0.5s ease;
      }
    `,
  ],
})
export class DailyEnergyMeter implements OnInit, OnDestroy {
  @Input() time!: Date;
  remainingEnergy = 100;
  private intervalId: any;

  ngOnInit() {
    this.updateEnergy();
    this.intervalId = setInterval(() => this.updateEnergy(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateEnergy() {
    if (!this.time) return;

    const startOfDay = new Date(
      this.time.getFullYear(),
      this.time.getMonth(),
      this.time.getDate()
    );
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const totalDay = endOfDay.getTime() - startOfDay.getTime();
    const elapsed = this.time.getTime() - startOfDay.getTime();

    this.remainingEnergy = 100 - (elapsed / totalDay) * 100;
  }
}
