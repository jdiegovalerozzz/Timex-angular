import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentricCirclesClock } from './concentric-circles-clock';

describe('ConcentricCirclesClock', () => {
  let component: ConcentricCirclesClock;
  let fixture: ComponentFixture<ConcentricCirclesClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcentricCirclesClock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcentricCirclesClock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
