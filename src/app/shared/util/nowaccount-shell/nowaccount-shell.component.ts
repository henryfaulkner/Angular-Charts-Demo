import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NowaccountSidenavComponent } from '../nowaccount-sidenav/nowaccount-sidenav.component';

@Component({
  selector: 'app-nowaccount-shell',
  templateUrl: './nowaccount-shell.component.html',
  styleUrls: ['./nowaccount-shell.component.scss'],
})
export class NowaccountShellComponent implements OnInit {
  @ViewChild('content', { static: true }) content: ElementRef<HTMLDivElement>;
  @ViewChild('container', { static: true })
  container: ElementRef<HTMLDivElement>;
  @ViewChild('sidenav', { static: true }) sidenav: ElementRef<NowaccountSidenavComponent>;

  isSidenavOpen = false;

  constructor() {}

  ngOnInit(): void {}

  openSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  closeSidenav() {
    if (this.isSidenavOpen) this.isSidenavOpen = !this.isSidenavOpen;
  }
}
