import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartjsScatterComponent } from './chartjs-scatter.component';

describe('ChartjsScatterComponent', () => {
  let component: ChartjsScatterComponent;
  let fixture: ComponentFixture<ChartjsScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartjsScatterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartjsScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
