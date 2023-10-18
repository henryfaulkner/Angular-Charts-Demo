import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowaccountSidenavComponent } from './nowaccount-sidenav.component';

describe('NowaccountSidenavComponent', () => {
  let component: NowaccountSidenavComponent;
  let fixture: ComponentFixture<NowaccountSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowaccountSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowaccountSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
