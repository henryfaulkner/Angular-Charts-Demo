import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
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
  public source: any;
  public sourceIndex: number;
  public activeContainer: any;
  isDraggable = true;

  constructor() {
    this.listGroup = null;
    this.placeholder = null;
    this.target = null;
    this.targetIndex = 0;
    this.source = null;
    this.sourceIndex = 0;
  }

  ngAfterViewInit() {}

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

  drop(event: CdkDragDrop<any>) {
    // this.items[event.previousContainer.data.index] = event.container.data.item;
    // this.items[event.container.data.index] = event.previousContainer.data.item;
    // event.currentIndex = 0;

    if (!this.target) return;
    if (!this.placeholder) return;

    let phElement = this.placeholder.element.nativeElement;
    let parent = phElement.parentNode;
    phElement.style.display = 'none';
    if (!parent) return;

    parent.removeChild(phElement);
    parent.appendChild(phElement);
    parent.insertBefore(
      this.source.element.nativeElement,
      parent.children[this.sourceIndex]
    );

    this.target = null;
    this.source = null;

    if (this.sourceIndex != this.targetIndex)
      moveItemInArray(this.items, this.sourceIndex, this.targetIndex);
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

    let dragIndex = __indexOf(
      dropElement.parentNode.children,
      drag.dropContainer.element.nativeElement
    );
    let dropIndex = __indexOf(dropElement.parentNode.children, dropElement);

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      let sourceElement = this.source.element.nativeElement;
      placeholderElement.style.width = sourceElement.clientWidth + 'px';
      placeholderElement.style.height = sourceElement.clientHeight + 'px';
      sourceElement.parentNode.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    placeholderElement.style.display = '';
    dropElement.parentNode.insertBefore(
      placeholderElement,
      dragIndex < dropIndex ? dropElement.nextSibling : dropElement
    );
    this.source.start();
    this.placeholder._dropListRef.enter(
      drag._dragRef,
      drag.element.nativeElement.offsetLeft,
      drag.element.nativeElement.offsetTop
    );
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
