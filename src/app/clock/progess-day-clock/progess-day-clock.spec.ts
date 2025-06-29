import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDayClock } from './progess-day-clock';

describe('ProgessDayClock', () => {
  let component: ProgressDayClock;
  let fixture: ComponentFixture<ProgressDayClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressDayClock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressDayClock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
