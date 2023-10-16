import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPortfolioPortionsGraphComponent } from './customer-portfolio-portions-graph.component';

describe('CustomerPortfolioPortionsGraphComponent', () => {
  let component: CustomerPortfolioPortionsGraphComponent;
  let fixture: ComponentFixture<CustomerPortfolioPortionsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPortfolioPortionsGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPortfolioPortionsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
