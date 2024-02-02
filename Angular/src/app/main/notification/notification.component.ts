import { Component } from '@angular/core';
import { I18nSelectPipe, NgFor, NgIf } from '@angular/common';
import { NotificationService } from 'src/app/common-services';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgIf, NgFor, I18nSelectPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  constructor(private vm: NotificationService) { }

  public get VM() { return this.vm; }
}
