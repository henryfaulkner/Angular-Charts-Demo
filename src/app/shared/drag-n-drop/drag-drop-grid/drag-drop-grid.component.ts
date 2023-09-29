import { Component, NgModule, ViewChild, Input } from '@angular/core';
import {
  CdkDrag,
  CdkDragStart,
  CdkDropList, CdkDropListGroup, CdkDragMove, CdkDragEnter,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import {ViewportRuler} from "@angular/cdk/overlay";
import { debounce, throttle } from 'lodash';
import { ChartDatasetVectorAndLabel } from 'src/app/core/types/chart-dataset-vector-and-label.type';

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
  
    public items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
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
      if (!this.placeholder) {
        return;
      }

      let phElement = this.placeholder.element.nativeElement;

      if(!phElement || !phElement.parentElement) {
        return;
      }
  
      phElement.style.display = 'none';
      phElement.parentElement.removeChild(phElement);
    }
  
    add() {
      this.items.push(this.items.length + 1);
    }
  
    shuffle() {
      this.items.sort(function() {
        return .5 - Math.random();
      });
    }
  
    dragMoved(e: CdkDragMove) {
      let point = this.getPointerPositionOnPage(e.event);

      if (!this.listGroup) {
        return
      }
  
      this.listGroup._items.forEach(dropList => {
        if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
          this.activeContainer = dropList;
          return;
        }
      });
    }
  
    dropListDropped(event: any) {
      if (!this.target) {
        return;
      }
      if (!this.placeholder) {
        return;
      }
      if(!this.source) {
        return;
      }
  
      let phElement = this.placeholder.element.nativeElement;
      let parent = phElement.parentElement;

      if(!parent) {
        return;
      }
  
      phElement.style.display = 'none';
  
      parent.removeChild(phElement);
      parent.appendChild(phElement);
      parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);
  
      this.target = null;
      this.source = null;
  
      if (this.sourceIndex !== this.targetIndex)
        moveItemInArray(this.items, this.sourceIndex, this.targetIndex);
    }

    dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
      // if (drop == this.placeholder) {
      //   console.log('drop == this.placeholder', drop == this.placeholder)
      //   return true;
      // }

      if (drop !== this.activeContainer) {
        console.log('drop, ', drop);
        return false;
      }

      if (!this.placeholder) {
        console.log('!this.placeholder', this.placeholder)
        return false;
      }
  
      let phElement = this.placeholder.element.nativeElement;
      let sourceElement = drag.dropContainer.element.nativeElement;
      let dropElement = drop.element.nativeElement;

      if (!dropElement.parentElement) { 
        return false;
      }
      if (!sourceElement || ! sourceElement.parentElement) {
        return false;
      }
  
      let dragIndex = __indexOf(dropElement.parentElement.children, (this.source ? phElement : sourceElement));
      let dropIndex = __indexOf(dropElement.parentElement.children, dropElement);
  
      if (!this.source) {
        console.log('!this.source, ', !this.source)
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
      console.log('hello')
      return true;
    }
    
    /** Determines the point of the page that was touched by the user. */
    getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
      // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
      const point = __isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
          const scrollPosition = this.viewportRuler.getViewportScrollPosition();
  
          return {
              x: point.pageX - scrollPosition.left,
              y: point.pageY - scrollPosition.top
          };
      }
  }
  
  function __indexOf(collection: any, node: any) {
    return Array.prototype.indexOf.call(collection, node);
  };
  
  /** Determines whether an event is a touch event. */
  function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return event.type.startsWith('touch');
  }
  
  function __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
    const {top, bottom, left, right} = dropList.element.nativeElement.getBoundingClientRect();
    return y >= top && y <= bottom && x >= left && x <= right; 
  }



