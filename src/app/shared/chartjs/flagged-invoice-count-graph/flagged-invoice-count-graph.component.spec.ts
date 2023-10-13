import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedInvoiceCountGraphComponent } from './flagged-invoice-count-graph.component';

describe('FlaggedInvoiceCountGraphComponent', () => {
  let component: FlaggedInvoiceCountGraphComponent;
  let fixture: ComponentFixture<FlaggedInvoiceCountGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlaggedInvoiceCountGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlaggedInvoiceCountGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
