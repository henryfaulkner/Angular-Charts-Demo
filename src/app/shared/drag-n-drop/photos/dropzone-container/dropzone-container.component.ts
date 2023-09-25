import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/core/types/photo.type';

@Component({
  selector: 'app-dropzone-container',
  templateUrl: './dropzone-container.component.html',
  styleUrls: ['./dropzone-container.component.scss']
})
export class DropzoneContainerComponent {
  photos: Photo[] = [];

  drop(event: CdkDragDrop<Photo[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
