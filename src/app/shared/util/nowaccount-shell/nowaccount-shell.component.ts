import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nowaccount-shell',
  templateUrl: './nowaccount-shell.component.html',
  styleUrls: ['./nowaccount-shell.component.scss'],
})
export class NowaccountShellComponent implements OnInit {
  @ViewChild('content', { static: true }) content: ElementRef<HTMLDivElement>;
  @ViewChild('container', { static: true })
  container: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit(): void {}
}
