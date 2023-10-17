import { Component, Input, OnInit } from '@angular/core';
import { NavTileIconTypes } from 'src/app/core/enum/nav-tile-icon-types.enum';

@Component({
  selector: 'app-nav-tile',
  templateUrl: './nav-tile.component.html',
  styleUrls: ['./nav-tile.component.scss']
})
export class NavTileComponent implements OnInit {
  @Input() headerText: string;
  @Input() tileStyle: 'center' | 'corner' = 'center';
  @Input() routerHref: string;
  @Input() iconType: NavTileIconTypes;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    
  }
}
