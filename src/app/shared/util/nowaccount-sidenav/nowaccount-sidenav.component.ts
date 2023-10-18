import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import * as KendoIcons from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-nowaccount-sidenav',
  templateUrl: './nowaccount-sidenav.component.html',
  styleUrls: ['./nowaccount-sidenav.component.scss'],
})
export class NowaccountSidenavComponent implements OnInit {
  @Input() isSidenavOpen: boolean;
  items: [];

  icons: KendoIcons.SVGIcon[];
  logoPath = '../../../assets/images/Now_Flower_Logo.png';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSidenav(event: DrawerSelectEvent) {}

  async navigate() {
    await this.router.navigate([], {
      queryParams: {},
    });
  }
}
