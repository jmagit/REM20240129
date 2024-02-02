import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import { LoggerService } from '@my/core';
import { AjaxWaitComponent, HeaderComponent, NotificationComponent, NotificationModalComponent } from './main';
import { NavigationService } from './common-services';
// import { DemosComponent } from './ejemplos/demos/demos.component';
// import { NotificationService, NotificationType } from './common-services';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { DeteccionComponent } from './deteccion/deteccion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NotificationComponent, NotificationModalComponent,
    AjaxWaitComponent, HeaderComponent,
    // DemosComponent,
    // DashboardComponent,
    // DeteccionComponent,
   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'curso';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(nav: NavigationService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // constructor(log: LoggerService) {
  //   log.error('Es un error')
  //   log.info('Hola mundo')
  // }

  // constructor(private notify: NotificationService) {}

  // ngOnInit(): void {
  //   this.notify.add('Aplicación arrancada', NotificationType.info)
  // }


}
