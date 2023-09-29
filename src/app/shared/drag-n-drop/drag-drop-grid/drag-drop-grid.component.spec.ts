import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropGridComponent } from './drag-drop-grid.component';

describe('DragDropGridComponent', () => {
  let component: DragDropGridComponent;
  let fixture: ComponentFixture<DragDropGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
