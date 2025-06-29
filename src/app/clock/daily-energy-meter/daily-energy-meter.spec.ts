import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyEnergyMeter } from './daily-energy-meter';

describe('DailyEnergyMeter', () => {
  let component: DailyEnergyMeter;
  let fixture: ComponentFixture<DailyEnergyMeter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyEnergyMeter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyEnergyMeter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
