import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneContainerComponent } from './dropzone-container.component';

describe('DropzoneContainerComponent', () => {
  let component: DropzoneContainerComponent;
  let fixture: ComponentFixture<DropzoneContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropzoneContainerComponent]
    });
    fixture = TestBed.createComponent(DropzoneContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
