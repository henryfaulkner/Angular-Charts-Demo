import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGridConfigSideswipeComponent } from './dashboard-grid-config-sideswipe.component';

describe('DashboardGridConfigSideswipeComponent', () => {
  let component: DashboardGridConfigSideswipeComponent;
  let fixture: ComponentFixture<DashboardGridConfigSideswipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardGridConfigSideswipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGridConfigSideswipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
