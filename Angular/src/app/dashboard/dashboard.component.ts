import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxWaitComponent, HomeComponent, NotificationComponent, NotificationModalComponent } from '../main';
import GraficoSvgComponent from 'src/lib/my-core/components/grafico-svg/grafico-svg.component';
import { LoginComponent } from '../security';
import { ContactosComponent } from '../contactos';
import { CalculadoraComponent } from '../ejemplos/calculadora/calculadora.component';
import { DemosComponent } from '../ejemplos/demos/demos.component';
import { DeteccionComponent } from '../deteccion/deteccion.component';
import { LibrosComponent } from '../libros';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NotificationComponent, NotificationModalComponent, AjaxWaitComponent, LoginComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menu = [
    { texto: 'libros', icono: 'fa-solid fa-book', componente: LibrosComponent},
    { texto: 'detectcion', icono: 'fa-solid fa-chalkboard-user', componente: DeteccionComponent},
    { texto: 'demos', icono: 'fa-solid fa-chalkboard-user', componente: DemosComponent},
    { texto: 'inicio', icono: 'fa-solid fa-house', componente: HomeComponent},
    { texto: 'calculadora', icono: 'fa-solid fa-calculator', componente: CalculadoraComponent},
    { texto: 'contactos', icono: 'fa-solid fa-address-book', componente: ContactosComponent},
    { texto: 'gráfico', icono: 'fa-solid fa-image', componente: GraficoSvgComponent},
  ]
  actual: any = this.menu[0].componente

  selecciona(index: number) {
    this.actual = this.menu[index].componente
  }
}
