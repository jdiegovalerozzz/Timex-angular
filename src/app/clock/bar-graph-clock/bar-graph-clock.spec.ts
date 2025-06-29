import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraphClock } from './bar-graph-clock';

describe('BarGraphClock', () => {
  let component: BarGraphClock;
  let fixture: ComponentFixture<BarGraphClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarGraphClock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarGraphClock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
