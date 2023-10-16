import { Component, OnInit } from '@angular/core';
import { ClientDashboardGraphTypes } from 'src/app/core/enum/client-dashboard-graph-types.enum';
import { ClientDashboardItem } from 'src/app/core/types/client-dashboard-item.type';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss'],
})
export class ClientDashboardComponent implements OnInit {
  items: ClientDashboardItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.populateClientDashboardItems();
  }

  populateClientDashboardItems() {
    this.items.push({
      id: '1',
      title: 'Flagged Invoice Count',
      type: ClientDashboardGraphTypes.FLAGGED_INVOICE_COUNT,
      selected: true,
      expanded: false,
      handleExpandSelection: () => {},
    });

    this.items.push({
      id: '2',
      title: 'The NowAccount Difference',
      type: ClientDashboardGraphTypes.NOWACCOUNT_DIFFERENCE,
      selected: true,
      expanded: false,
      handleExpandSelection: () => {},
    });

    this.items.push({
      id: '3',
      title: 'Credit Request Utilization',
      type: ClientDashboardGraphTypes.CREDIT_REQUEST_UTILIZATION,
      selected: true,
      expanded: false,
      handleExpandSelection: () => {},
    });

    this.items.push({
      id: '4',
      title: 'Client Capacity Utilization',
      type: ClientDashboardGraphTypes.CLIENT_CAPACITY_UTILIZATION,
      selected: true,
      expanded: false,
      handleExpandSelection: () => {},
    });
  }
}
