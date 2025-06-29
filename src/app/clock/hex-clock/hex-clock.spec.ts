import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexClock } from './hex-clock';

describe('HexClock', () => {
  let component: HexClock;
  let fixture: ComponentFixture<HexClock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HexClock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HexClock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
