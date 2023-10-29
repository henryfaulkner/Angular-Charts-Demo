import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ClientDashboardGraphTypes } from 'src/app/core/enum/client-dashboard-graph-types.enum';
import { ClientDashboardItem } from 'src/app/core/types/client-dashboard-item.type';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss'],
})
export class ClientDashboardComponent implements OnInit {
  items: ClientDashboardItem[] = [];
  graphTypesEnum = ClientDashboardGraphTypes;
  dialogSelectedItem: ClientDashboardItem | null = null;
  @ViewChild('dialog') dialogElementRef: ElementRef;

  ngOnInit(): void {
    this.populateClientDashboardItems();
  }

  populateClientDashboardItems() {
    this.items.push({
      id: '1',
      title: 'Flagged Invoice Count',
      altTitle: 'Flagged Invoice Count',
      type: ClientDashboardGraphTypes.FLAGGED_INVOICE_COUNT,
      selected: true,
      expanded: false,
      handleExpandSelection: () => {},
      displayType: 'main',
    });

    this.items.push({
      id: '2',
      title: 'The NowAccount Difference',
      altTitle: 'The NowAccount Difference',
      type: ClientDashboardGraphTypes.NOWACCOUNT_DIFFERENCE,
      selected: true,
      expanded: false,
      handleExpandSelection: () => {},
      displayType: 'main',
    });

    this.items.push({
      id: '3',
      title: 'Credit Request Utilization',
      altTitle: 'Credit Request Utilization',
      type: ClientDashboardGraphTypes.CREDIT_REQUEST_UTILIZATION,
      selected: true,
      expanded: false,
      handleExpandSelection: () => {},
      displayType: 'main',
    });

    this.items.push({
      id: '4',
      title: 'Client Capacity Utilization',
      altTitle: 'Client Capacity Utilization',
      type: ClientDashboardGraphTypes.CLIENT_CAPACITY_UTILIZATION,
      selected: true,
      expanded: false,
      handleExpandSelection: () => {},
      displayType: 'main',
    });

    this.items.push({
      id: '5',
      title: 'Customer Portfolio Portions',
      altTitle: 'Customer Portfolio Portions',
      type: ClientDashboardGraphTypes.CUSTOMER_PORTFOLIO_PORTIONS,
      selected: true,
      expanded: false,
      handleExpandSelection: () => {},
      displayType: 'main',
    });
  }

  dialogSelectEventListener(item: ClientDashboardItem) {
    console.log('dialogSelectEventListener');
    this.dialogSelectedItem = item;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    console.log('mouse click');
    if (!this.dialogElementRef) return;
    // Check if the click target is outside the component
    const isClickedOutside = !this.dialogElementRef.nativeElement.contains(
      event.target
    );
    console.log('isClickedOutside, ', isClickedOutside);
    if (isClickedOutside) this.dialogSelectedItem = null;
  }
}
