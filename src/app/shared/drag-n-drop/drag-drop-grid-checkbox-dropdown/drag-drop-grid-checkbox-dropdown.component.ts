import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientDashboardItem } from 'src/app/core/types/client-dashboard-item.type';

@Component({
  selector: 'app-drag-drop-grid-checkbox-dropdown',
  templateUrl: './drag-drop-grid-checkbox-dropdown.component.html',
  styleUrls: ['./drag-drop-grid-checkbox-dropdown.component.scss'],
})
export class DragDropGridCheckboxDropdownComponent implements OnInit {
  @Input() items: ClientDashboardItem[] = [];
  @Input() dropdownSelectionEvent: EventEmitter<ClientDashboardItem>;
  @Output() outputParameter: EventEmitter<ClientDashboardItem>;
  isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  changeSelection(item: ClientDashboardItem) {
    item.selected = !item.selected;
    this.outputParameter.emit(item);
  }
}
