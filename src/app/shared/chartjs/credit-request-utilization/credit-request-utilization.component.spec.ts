import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRequestUtilizationComponent } from './credit-request-utilization.component';

describe('CreditRequestUtilizationComponent', () => {
  let component: CreditRequestUtilizationComponent;
  let fixture: ComponentFixture<CreditRequestUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditRequestUtilizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditRequestUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
