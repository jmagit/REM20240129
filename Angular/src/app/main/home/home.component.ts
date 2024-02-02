import { Component/*, OnInit*/ } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NotificationService, NotificationType } from './common-services';
// import { LoggerService } from '@my/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent /*implements OnInit*/ {
  title = 'curso';

  // constructor(out: LoggerService) {
  //   out.error(`Es un error`)
  //   out.warn(`Es un warn`)
  //   out.info(`Es un info`)
  //   out.log(`Es un log`)
  // }
  // constructor(private notify: NotificationService) {}

  // ngOnInit(): void {
  //   this.notify.add('Aplicación arrancada', NotificationType.info)
  // }

}
