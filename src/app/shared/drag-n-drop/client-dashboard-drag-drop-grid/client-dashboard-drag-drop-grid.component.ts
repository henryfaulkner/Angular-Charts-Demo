import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDropList,
  CdkDropListGroup,
  DragRef,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ClientDashboardGraphTypes } from 'src/app/core/enum/client-dashboard-graph-types.enum';
import { ClientDashboardItem } from 'src/app/core/types/client-dashboard-item.type';

@Component({
  selector: 'app-client-dashboard-drag-drop-grid',
  templateUrl: './client-dashboard-drag-drop-grid.component.html',
  styleUrls: ['./client-dashboard-drag-drop-grid.component.scss'],
})
export class ClientDashboardDragDropGridComponent {
  // Variables for charting
  @Input() items: ClientDashboardItem[] = [];
  graphTypesEnum = ClientDashboardGraphTypes;

  @ViewChild('flexWrap', { static: true }) flexWrap: ElementRef;
  @ViewChild('flexWrapChild', { static: true }) flexWrapChild: ElementRef;

  // Variables for tracking drag and drop actions
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList> | null;
  @ViewChild(CdkDropList) placeholder: CdkDropList | null;
  public target: CdkDropList | null;
  public targetIndex: number;
  public source: any;
  public sourceIndex: number;
  public activeContainer: any;
  public dragRef: DragRef | null;
  isDraggable = false;

  constructor() {
    this.listGroup = null;
    this.placeholder = null;
    this.target = null;
    this.targetIndex = 0;
    this.source = null;
    this.sourceIndex = 0;
    this.dragRef = null;
  }

  ngAfterViewInit() {
    if (!this.placeholder) return;
    const placeholderElement = this.placeholder.element.nativeElement;
    if (!placeholderElement || !placeholderElement.parentNode) return;
    placeholderElement.style.display = 'none';
    placeholderElement.parentNode.removeChild(placeholderElement);
  }

  //#region CONTROLS region

  // Method to shuffle the items
  shuffle() {
    this.items.sort(function () {
      return 0.5 - Math.random();
    });
  }

  // Method to update hidden / displayed charts
  handleDropdownSelection(selectedItem: ClientDashboardItem) {
    this.items = this.items.map((item: ClientDashboardItem) => {
      if (item.id === selectedItem.id) return selectedItem;
      else return item;
    });
  }

  handleExpandSelection(item: ClientDashboardItem) {
    item.expanded = !item.expanded;
    item.handleExpandSelection(item);
  }

  toggleDraggability() {
    this.isDraggable = !this.isDraggable;
  }

  //#endregion

  //#region DRAG AND DROP region

  dragIndex = -1;
  drop(event: CdkDragDrop<any>) {
    if (!this.target) return;
    if (!this.placeholder) return;

    if (!this.target) {
      return;
    }

    const placeholderElement: HTMLElement =
      this.placeholder.element.nativeElement;
    if (!placeholderElement || !placeholderElement.parentElement) return;
    const placeholderParentElement: HTMLElement =
      placeholderElement.parentElement;

    placeholderElement.style.display = 'none';

    placeholderParentElement.removeChild(placeholderElement);
    placeholderParentElement.appendChild(placeholderElement);
    placeholderParentElement.insertBefore(
      this.source.element.nativeElement,
      placeholderParentElement.children[this.sourceIndex]
    );

    if (this.placeholder._dropListRef.isDragging()) {
      if (this.dragRef) {
        this.placeholder._dropListRef.exit(this.dragRef);
      }
    }

    this.target = null;
    this.source = null;
    this.dragRef = null;
    this.dragIndex = -1;

    if (this.sourceIndex !== this.targetIndex) {
      moveItemInArray(this.items, this.sourceIndex, this.targetIndex);
    }
  }

  enter(event: CdkDragEnter<any>) {
    const drag = event.item;
    const drop = event.container;

    if (drop === this.placeholder) {
      return true;
    }
    if (!this.placeholder) {
      return false;
    }

    let placeholderElement = this.placeholder.element.nativeElement;
    let dropElement = drop.element.nativeElement;

    if (!dropElement.parentNode) {
      return false;
    }

    if (this.dragIndex === -1) {
      this.dragIndex = __indexOf(
        dropElement.parentNode.children,
        drag.dropContainer.element.nativeElement
      );
    }

    let dropIndex = __indexOf(dropElement.parentNode.children, dropElement);

    if (!this.source) {
      this.sourceIndex = this.dragIndex;
      this.source = drag.dropContainer;
    }

    this.targetIndex = dropIndex;
    this.target = drop;
    this.dragRef = drag._dragRef;
    placeholderElement.style.display = '';

    dropElement.parentNode.insertBefore(
      placeholderElement,
      this.dragIndex < dropIndex ? dropElement.nextSibling : dropElement
    );

    this.placeholder._dropListRef.enter(
      drag._dragRef,
      drag.element.nativeElement.offsetLeft,
      drag.element.nativeElement.offsetTop
    );

    this.dragIndex = dropIndex;
    return false;
  }

  //#endregion
}

// Utility function to find the index of an element in a collection
function __indexOf(collection: any, node: any) {
  return Array.prototype.indexOf.call(collection, node);
}
