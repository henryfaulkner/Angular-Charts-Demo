import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ClientDashboardItem } from 'src/app/core/types/client-dashboard-item.type';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-dashboard-grid-config-sideswipe',
  templateUrl: './dashboard-grid-config-sideswipe.component.html',
  styleUrls: ['./dashboard-grid-config-sideswipe.component.scss'],
})
export class DashboardGridConfigSideswipeComponent implements OnInit {
  @Input() items: ClientDashboardItem[] = [];
  @Input() defaultItems: ClientDashboardItem[] = [];
  @Output() dropdownSelectionEvent = new EventEmitter<ClientDashboardItem>();
  @Output() toggleDraggabilityEvent = new EventEmitter();
  @Output() shuffleEvent = new EventEmitter();
  @ViewChildren('checkbox') checkboxes: QueryList<ElementRef>;

  isSideswipeOpen = false;

  constructor(private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

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

  handleTileSelection(item: ClientDashboardItem) {
    item.selected = !item.selected;
    this.dropdownSelectionEvent.emit(item);
  }

  resetToDefault() {
    // watch out for running out of memory on reset spam
    this.items = cloneDeep(this.defaultItems);
    this.items.forEach((item) => {
      this.dropdownSelectionEvent.emit(item);
    });
    this.changeDetectorRef.detectChanges();
  }
}
