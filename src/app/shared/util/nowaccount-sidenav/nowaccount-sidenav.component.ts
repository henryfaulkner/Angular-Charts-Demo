import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectEvent } from '@progress/kendo-angular-layout';
import * as KendoIcons from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-nowaccount-sidenav',
  templateUrl: './nowaccount-sidenav.component.html',
  styleUrls: ['./nowaccount-sidenav.component.scss'],
})
export class NowaccountSidenavComponent implements OnInit {
  @Input() isSidenavOpen: boolean;

  icons: KendoIcons.SVGIcon[];
  logoPath = '../../../assets/images/Now_Flower_Logo.png';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSidenav(event: SelectEvent) {}

  async navigate() {
    await this.router.navigate([], {
      queryParams: {},
    });
  }
}
