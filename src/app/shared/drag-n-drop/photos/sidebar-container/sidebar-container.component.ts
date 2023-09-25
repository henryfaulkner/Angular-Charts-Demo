import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/core/types/photo.type';
import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-sidebar-container',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarContainerComponent {
  photos$!: Observable<Photo[]>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.photos$ = this.http.get<Photo[]>(
      `https://jsonplaceholder.typicode.com/photos?_limit=5`
    );
  }

  drop(event: CdkDragDrop<Photo[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
