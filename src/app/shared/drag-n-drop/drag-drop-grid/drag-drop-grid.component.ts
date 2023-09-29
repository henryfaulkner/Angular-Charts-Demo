import { Component, NgModule, ViewChild, Input } from '@angular/core';
import {
  CdkDrag,
  CdkDragStart,
  CdkDropList,
  CdkDropListGroup,
  CdkDragMove,
  CdkDragEnter,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import { ViewportRuler } from "@angular/cdk/overlay";
import { debounce, throttle } from 'lodash';
import { ChartDatasetVectorAndLabel } from 'src/app/core/types/chart-dataset-vector-and-label.type';
import { ChartComponentProps } from 'src/app/core/types/chart-component-props.type';

@Component({
  selector: 'app-drag-drop-grid',
  templateUrl: './drag-drop-grid.component.html',
  styleUrls: ['./drag-drop-grid.component.scss']
})
export class DragDropGridComponent {
  @Input() labels: string[] = [];
  @Input() datasets: ChartDatasetVectorAndLabel[] = [];

  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList> | null;
  @ViewChild(CdkDropList) placeholder: CdkDropList | null;

  // Array to store chart items
  public items: ChartComponentProps[] = [
    { id: '1', type: 'bar', labels: this.labels, datasets: this.datasets},  
    { id: '2', type: 'bar', labels: this.labels, datasets: this.datasets},  
    { id: '3', type: 'bar', labels: this.labels, datasets: this.datasets},  
    { id: '4', type: 'bar', labels: this.labels, datasets: this.datasets},  
    { id: '5', type: 'pie', labels: this.labels, datasets: this.datasets},  
    { id: '6', type: 'bar', labels: this.labels, datasets: this.datasets},  
    { id: '7', type: 'pie', labels: this.labels, datasets: this.datasets},  
    { id: '8', type: 'pie', labels: this.labels, datasets: this.datasets},  
    { id: '9', type: 'pie', labels: this.labels, datasets: this.datasets},
  ];

  // Variables for tracking drag and drop actions
  public target: CdkDropList | null;
  public targetIndex: number;
  public source: CdkDropList | null;
  public sourceIndex: number;
  public dragIndex: number;
  public activeContainer: any;

  constructor(private viewportRuler: ViewportRuler) {
    this.listGroup = null;
    this.placeholder = null;
    this.target = null;
    this.targetIndex = 0;
    this.source = null;
    this.sourceIndex = 0;
    this.dragIndex = 0;
    this.activeContainer = null;
  }

  ngAfterViewInit() {
    // Hide the placeholder element
    if (!this.placeholder) {
      return;
    }
    let phElement = this.placeholder.element.nativeElement;
    if (!phElement || !phElement.parentElement) {
      return;
    }
    phElement.style.display = 'none';
    phElement.parentElement.removeChild(phElement);
  }

  // Method to add a bar chart item
  addBarChart() {
    this.items.push({ id: (this.items.length + 1).toString(), type: 'bar', labels: this.labels, datasets: this.datasets });
  }

  // Method to add a pie chart item
  addPieChart() {
    this.items.push({ id: (this.items.length + 1).toString(), type: 'bar', labels: this.labels, datasets: this.datasets });
  }

  // Method to shuffle the items
  shuffle() {
    this.items.sort(function () {
      return .5 - Math.random();
    });
  }

  // Method called during a drag operation
  dragMoved(e: CdkDragMove) {
    // Determine the active drop container
    let point = this.getPointerPositionOnPage(e.event);
    if (!this.listGroup) {
      return;
    }
    this.listGroup._items.forEach(dropList => {
      if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
        this.activeContainer = dropList;
        return;
      }
    });
  }

  // Method called when an item is dropped
  dropListDropped(event: any) {
    // Handle the drop event
    if (!this.target) {
      return;
    }
    if (!this.placeholder) {
      return;
    }
    if (!this.source) {
      return;
    }
    let phElement = this.placeholder.element.nativeElement;
    let parent = phElement.parentElement;
    if (!parent) {
      return;
    }
    phElement.style.display = 'none';
    parent.removeChild(phElement);
    parent.appendChild(phElement);
    parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);
    this.target = null;
    this.source = null;
    if (this.sourceIndex !== this.targetIndex) {
      moveItemInArray(this.items, this.sourceIndex, this.targetIndex);
    }
  }

  // Predicate function for entering a drop container
  dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    // Check if the item can be dropped into the container
    if (drop !== this.activeContainer) {
      return false;
    }
    if (!this.placeholder) {
      return false;
    }
    let phElement = this.placeholder.element.nativeElement;
    let sourceElement = drag.dropContainer.element.nativeElement;
    let dropElement = drop.element.nativeElement;
    if (!dropElement.parentElement) {
      return false;
    }
    if (!sourceElement || !sourceElement.parentElement) {
      return false;
    }
    let dragIndex = __indexOf(dropElement.parentElement.children, (this.source ? phElement : sourceElement));
    let dropIndex = __indexOf(dropElement.parentElement.children, dropElement);
    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;
      phElement.style.width = sourceElement.clientWidth + 'px';
      phElement.style.height = sourceElement.clientHeight + 'px';
      sourceElement.parentElement.removeChild(sourceElement);
    }
    this.targetIndex = dropIndex;
    this.target = drop;
    phElement.style.display = '';
    dropElement.parentElement.insertBefore(phElement, (dropIndex > dragIndex
      ? dropElement.nextSibling : dropElement));
    this.placeholder._dropListRef.enter(drag._dragRef, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
    return true;
  }

  /** Determines the point of the page that was touched by the user. */
  getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
    // Determine the position of the touch or mouse event
    const point = __isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
    const scrollPosition = this.viewportRuler.getViewportScrollPosition();
    return {
      x: point.pageX - scrollPosition.left,
      y: point.pageY - scrollPosition.top
    };
  }
}

// Utility function to find the index of an element in a collection
function __indexOf(collection: any, node: any) {
  return Array.prototype.indexOf.call(collection, node);
};

/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type.startsWith('touch');
}

// Utility function to check if a point is inside a drop container's client rect
function __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
  const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
  return y >= top && y <= bottom && x >= left && x <= right;
}
