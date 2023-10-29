import { Component, Input, OnInit } from '@angular/core';
import { Alert } from 'src/app/core/types/alert.type';

@Component({
  selector: 'app-alert-icon',
  templateUrl: './alert-icon.component.html',
  styleUrls: ['./alert-icon.component.scss'],
})
export class AlertIconComponent implements OnInit {
  @Input() alert: Alert = { alerted: false, messages: [] };
  message = '';

  ngOnInit(): void {
    this.alert.messages.forEach((str: string) => (this.message += `${str}\n`));
  }
}
