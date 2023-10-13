import { Component, OnInit } from '@angular/core';
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
    this.items.push({
      id: '1',
      title: 'Flagged Invoice Count',
      type: 'flagged-invoice-chart',
      selected: true,
      expanded: false,
      handleExpandSelection: () => {}
    });

    this.items.push({
      id: '2',
      title: 'The NowAccount Difference',
      type: 'nowaccount-difference',
      selected: true,
      expanded: false,
      handleExpandSelection: () => {}
    });
  }
}
