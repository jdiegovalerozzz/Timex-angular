import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySecondsCounter } from './day-seconds-counter';

describe('DaySecondsCounter', () => {
  let component: DaySecondsCounter;
  let fixture: ComponentFixture<DaySecondsCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaySecondsCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaySecondsCounter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
