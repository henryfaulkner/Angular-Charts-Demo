import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCapacityUtilizationGraphComponent } from './client-capacity-utilization-graph.component';

describe('ClientCapacityUtilizationGraphComponent', () => {
  let component: ClientCapacityUtilizationGraphComponent;
  let fixture: ComponentFixture<ClientCapacityUtilizationGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCapacityUtilizationGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCapacityUtilizationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
