import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDashboardDragDropGridComponent } from './client-dashboard-drag-drop-grid.component';

describe('ClientDashboardDragDropGridComponent', () => {
  let component: ClientDashboardDragDropGridComponent;
  let fixture: ComponentFixture<ClientDashboardDragDropGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDashboardDragDropGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDashboardDragDropGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
