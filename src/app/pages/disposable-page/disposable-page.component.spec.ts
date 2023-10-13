import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposablePageComponent } from './disposable-page.component';

describe('DisposablePageComponent', () => {
  let component: DisposablePageComponent;
  let fixture: ComponentFixture<DisposablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposablePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisposablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
