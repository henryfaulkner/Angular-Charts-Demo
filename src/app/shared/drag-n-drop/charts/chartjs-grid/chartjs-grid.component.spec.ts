import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartjsGridComponent } from './chartjs-grid.component';

describe('ChartjsGridComponent', () => {
  let component: ChartjsGridComponent;
  let fixture: ComponentFixture<ChartjsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartjsGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartjsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
