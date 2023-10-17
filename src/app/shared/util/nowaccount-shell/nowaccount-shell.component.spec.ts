import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowaccountShellComponent } from './nowaccount-shell.component';

describe('NowaccountShellComponent', () => {
  let component: NowaccountShellComponent;
  let fixture: ComponentFixture<NowaccountShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowaccountShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowaccountShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
