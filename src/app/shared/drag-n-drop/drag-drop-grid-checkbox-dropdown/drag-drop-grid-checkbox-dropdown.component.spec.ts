import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropGridCheckboxDropdownComponent } from './drag-drop-grid-checkbox-dropdown.component';

describe('DragDropGridCheckboxDropdownComponent', () => {
  let component: DragDropGridCheckboxDropdownComponent;
  let fixture: ComponentFixture<DragDropGridCheckboxDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropGridCheckboxDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropGridCheckboxDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
