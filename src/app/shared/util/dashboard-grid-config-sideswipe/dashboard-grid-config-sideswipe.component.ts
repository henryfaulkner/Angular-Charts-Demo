import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ClientDashboardItem } from 'src/app/core/types/client-dashboard-item.type';

@Component({
  selector: 'app-dashboard-grid-config-sideswipe',
  templateUrl: './dashboard-grid-config-sideswipe.component.html',
  styleUrls: ['./dashboard-grid-config-sideswipe.component.scss'],
})
export class DashboardGridConfigSideswipeComponent {
  @Input() items: ClientDashboardItem[] = [];
  @Output() dropdownSelectionEvent = new EventEmitter<ClientDashboardItem>();
  @Output() toggleDraggabilityEvent = new EventEmitter();
  @Output() shuffleEvent = new EventEmitter();

  isSideswipeOpen = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef) return;
    // Check if the click target is outside the component
    const isClickedOutside = !this.elementRef.nativeElement.contains(
      event.target
    );
    if (isClickedOutside) this.closeSideswipe();
  }

  openSideswipe() {
    this.isSideswipeOpen = !this.isSideswipeOpen;
  }

  closeSideswipe() {
    if (this.isSideswipeOpen) this.isSideswipeOpen = !this.isSideswipeOpen;
  }

  toggleDraggability() {
    this.toggleDraggabilityEvent.emit();
  }

  shuffle() {
    this.shuffleEvent.emit();
  }
}
