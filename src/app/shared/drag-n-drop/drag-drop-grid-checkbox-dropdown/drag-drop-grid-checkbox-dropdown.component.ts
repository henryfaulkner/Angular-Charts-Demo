import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartComponentProps } from 'src/app/core/types/chart-component-props.type';

@Component({
  selector: 'app-drag-drop-grid-checkbox-dropdown',
  templateUrl: './drag-drop-grid-checkbox-dropdown.component.html',
  styleUrls: ['./drag-drop-grid-checkbox-dropdown.component.scss'],
})
export class DragDropGridCheckboxDropdownComponent implements OnInit {
  @Input() items: ChartComponentProps[] = [];
  @Output() outputParameter: EventEmitter<any> = new EventEmitter<any>();
  isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  changeSelection(item: ChartComponentProps) {
    item.selected = !item.selected;
    this.outputParameter.emit(item);
  }
}
