import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowaccountDifferenceGraphComponent } from './nowaccount-difference-graph.component';

describe('NowaccountDifferenceGraphComponent', () => {
  let component: NowaccountDifferenceGraphComponent;
  let fixture: ComponentFixture<NowaccountDifferenceGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowaccountDifferenceGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowaccountDifferenceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
