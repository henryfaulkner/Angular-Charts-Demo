import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavTileIconTypes } from 'src/app/core/enum/nav-tile-icon-types.enum';
import { Alert } from 'src/app/core/types/alert.type';

@Component({
  selector: 'app-nav-tile',
  templateUrl: './nav-tile.component.html',
  styleUrls: ['./nav-tile.component.scss'],
})
export class NavTileComponent implements OnInit {
  @Input() headerText: string;
  @Input() routerHref: string;
  @Input() iconType: NavTileIconTypes;
  @Input() displayType: 'main' | 'alt' = 'main';
  @Input() alert: Alert = { alerted: false, messages: [] };
  @ViewChild('altContent', { static: true }) altContent: ElementRef;
  hasAltContent = false;

  ngOnInit(): void {
    this.hasAltContent = this.altContent.nativeElement.children.length > 0;
  }

  onCardClick() {}

  onAltClick() {
    this.displayType = this.displayType === 'main' ? 'alt' : 'main';
  }
}
