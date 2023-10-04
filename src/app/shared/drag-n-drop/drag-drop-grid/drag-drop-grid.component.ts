import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDropList,
  CdkDropListGroup,
  DragRef,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  isDraggable = true;

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

// Determines whether an event is a touch event.
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

function getComputedValue(container: HTMLElement | Element, cssProp: string) {
  return parseInt(
    window
      .getComputedStyle(container, null)
      .getPropertyValue(cssProp)
      .split('px')[0]
  );
}

function calcFlexWrapColumns(container: ElementRef, child: ElementRef): number {
  let parentWidth = getComputedValue(container.nativeElement, 'width');
  let parentMarginLeft = getComputedValue(
    container.nativeElement,
    'margin-left'
  );
  let parentMarginRight = getComputedValue(
    container.nativeElement,
    'margin-Right'
  );
  let parentPaddingLeft = getComputedValue(
    container.nativeElement,
    'padding-left'
  );
  let parentPaddingRight = getComputedValue(
    container.nativeElement,
    'padding-Right'
  );

  if (!child) return 0;
  let childWidth = getComputedValue(child.nativeElement, 'width');
  let childMarginLeft = getComputedValue(child.nativeElement, 'margin-left');
  let childMarginRight = getComputedValue(child.nativeElement, 'margin-right');
  let childPaddingLeft = getComputedValue(child.nativeElement, 'padding-left');
  let childPaddingRight = getComputedValue(
    child.nativeElement,
    'padding-right'
  );

  let parentWidthNoPaddingOrMargin =
    parentWidth -
    parentPaddingLeft -
    parentPaddingRight -
    parentMarginLeft -
    parentMarginRight;
  let childWidthWithMarginAndPadding =
    childWidth +
    childMarginLeft +
    childMarginRight +
    childPaddingLeft +
    childPaddingRight +
    10;
  console.log('parentWidthNoPaddingOrMargin, ', parentWidthNoPaddingOrMargin);
  console.log(
    'childWidthWithMarginAndPadding, ',
    childWidthWithMarginAndPadding
  );

  parentWidthNoPaddingOrMargin =
    parentWidthNoPaddingOrMargin + childMarginLeft + childMarginRight;
  let numColumns =
    parentWidthNoPaddingOrMargin / childWidthWithMarginAndPadding;
  return numColumns;
}
