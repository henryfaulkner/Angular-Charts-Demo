import {
  CdkDrag,
  CdkDragMove,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponentProps } from 'src/app/core/types/chart-component-props.type';
import { ChartDatasetVectorAndLabel } from 'src/app/core/types/chart-dataset-vector-and-label.type';
import { handleExpandReduceChartData } from 'src/app/core/ui-helpers/handle-expand-reduce-chart-data.func';

@Component({
  selector: 'app-drag-drop-grid',
  templateUrl: './drag-drop-grid.component.html',
  styleUrls: ['./drag-drop-grid.component.scss'],
})
export class DragDropGridComponent {
  // Variables for charting
  @Input() items: ChartComponentProps[] = [];
  @Input() barLabels: string[] = [];
  @Input() barDatasets: ChartDatasetVectorAndLabel[] = [];
  @Input() pieLabels: string[] = [];
  @Input() pieDatasets: ChartDatasetVectorAndLabel[] = [];

  // Variables for tracking drag and drop actions
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList> | null;
  @ViewChild(CdkDropList) placeholder: CdkDropList | null;
  public target: CdkDropList | null;
  public targetIndex: number;
  public source: CdkDropList | null;
  public sourceIndex: number;
  public dragIndex: number;
  public activeContainer: any;
  isDraggable = true;

  constructor(private viewportRuler: ViewportRuler) {
    this.listGroup = null;
    this.placeholder = null;
    this.target = null;
    this.targetIndex = 0;
    this.source = null;
    this.sourceIndex = 0;
    this.dragIndex = 0;
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

  //#region CONTROLS region

  // Method to add a bar chart item
  addBarChart() {
    this.items.push({
      id: (this.items.length + 1).toString(),
      title: (this.items.length + 1).toString(),
      type: 'bar',
      labels: this.barLabels,
      displayLabels: this.barLabels,
      datasets: this.barDatasets,
      displayDatasets: this.barDatasets,
      selected: true,
      expanded: false,
      handleExpandSelection: handleExpandReduceChartData,
    });
  }

  // Method to add a pie chart item
  addPieChart() {
    this.items.push({
      id: (this.items.length + 1).toString(),
      title: (this.items.length + 1).toString(),
      type: 'pie',
      labels: this.pieLabels,
      displayLabels: this.pieLabels,
      datasets: this.pieDatasets,
      displayDatasets: this.pieDatasets,
      selected: true,
      expanded: false,
      handleExpandSelection: (item: ChartComponentProps) => {},
    });
  }

  // Method to shuffle the items
  shuffle() {
    this.items.sort(function () {
      return 0.5 - Math.random();
    });
  }

  // Method to update hidden / displayed charts
  handleDropdownSelection(selectedItem: ChartComponentProps) {
    this.items = this.items.map((item: ChartComponentProps) => {
      if (item.id === selectedItem.id) return selectedItem;
      else return item;
    });
  }

  handleExpandSelection(item: ChartComponentProps) {
    item.expanded = !item.expanded;
    item.handleExpandSelection(item);
  }

  expandData() {}

  reduceData() {}

  toggleDraggability() {
    this.isDraggable = !this.isDraggable;
  }

  //#endregion

  //#region DRAG AND DROP region

  // Method called during a drag operation
  dragMoved(e: CdkDragMove) {
    // Determine the active drop container
    let point = this.getPointerPositionOnPage(e.event);
    if (!this.listGroup) {
      return;
    }
    this.listGroup._items.forEach((dropList) => {
      if (
        __isInsideDropListClientRect(dropList, point.x, point.y) &&
        dropList
      ) {
        this.activeContainer = dropList;
        return;
      }
    });
  }

  // Method called when an item is dropped
  dropListDropped(event: any) {
    console.log('dropped');
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
    parent.insertBefore(
      this.source.element.nativeElement,
      parent.children[this.sourceIndex]
    );
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
      console.log('predicate false, drop !== this.activeContainer');
      return false;
    }
    if (!this.placeholder) {
      console.log('predicate false, !this.placeholder');
      return false;
    }
    let phElement = this.placeholder.element.nativeElement;
    let sourceElement = drag.dropContainer.element.nativeElement;
    let dropElement = drop.element.nativeElement;
    if (!dropElement.parentElement) {
      console.log('predicate false, !dropElement.parentElement');
      return false;
    }
    if (!sourceElement || !sourceElement.parentElement) {
      console.log(
        'predicate false, !sourceElement || !sourceElement.parentElement'
      );
      return false;
    }
    let dragIndex = __indexOf(
      dropElement.parentElement.children,
      this.source ? phElement : sourceElement
    );
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
    dropElement.parentElement.insertBefore(
      phElement,
      dropIndex > dragIndex ? dropElement.nextSibling : dropElement
    );
    this.placeholder._dropListRef.enter(
      drag._dragRef,
      drag.element.nativeElement.offsetLeft,
      drag.element.nativeElement.offsetTop
    );
    console.log('predicate true');
    return true;
  };

  /** Determines the point of the page that was touched by the user. */
  getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
    // Determine the position of the touch or mouse event
    const point = __isTouchEvent(event)
      ? event.touches[0] || event.changedTouches[0]
      : event;
    const scrollPosition = this.viewportRuler.getViewportScrollPosition();
    return {
      x: point.pageX - scrollPosition.left,
      y: point.pageY - scrollPosition.top,
    };
  }

  //#endregion
}

// Utility function to find the index of an element in a collection
function __indexOf(collection: any, node: any) {
  return Array.prototype.indexOf.call(collection, node);
}

/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type.startsWith('touch');
}

// Utility function to check if a point is inside a drop container's client rect
function __isInsideDropListClientRect(
  dropList: CdkDropList,
  x: number,
  y: number
) {
  const { top, bottom, left, right } =
    dropList.element.nativeElement.getBoundingClientRect();
  return y >= top && y <= bottom && x >= left && x <= right;
}
