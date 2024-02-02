import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { NotificationService, NotificationType } from '../../common-services';
import { NotificationComponent } from "../../main";
import { Unsubscribable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElipsisPipe, CapitalizePipe, SizerComponent, ExecPipe, LoggerService } from '@my/core';
import { CardComponent, FormButtonsComponent } from 'src/app/common-component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';

@Component({
  selector: 'app-demos',
  standalone: true,
  templateUrl: './demos.component.html',
  styleUrl: './demos.component.css',
  imports: [CommonModule, FormsModule, ElipsisPipe, CapitalizePipe, SizerComponent, CalculadoraComponent,
    CardComponent, NotificationComponent, ExecPipe, FormButtonsComponent],
  // providers: [ NotificationService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemosComponent {
  private suscriptor?: Unsubscribable;
  private nombre: string = 'mundo'
  fecha = '2023-01-28'
  fontSize = 24
  listado = [
    { id: 1, nombre: 'Madrid' },
    { id: 2, nombre: 'barcelona' },
    { id: 3, nombre: 'VALENCIA' },
    { id: 4, nombre: 'ciudad Real' },
  ]
  idProvincia = 2
  sinVincular = ''
  resultado?: string
  visible = true
  estetica = { importante: true, error: false, urgente: true }

  constructor(public vm: NotificationService, private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef, private log: LoggerService) {
    this.calcula = this.calcula.bind(this)
  }

  public get Nombre(): string { return this.nombre; }
  public set Nombre(valor: string) {
    if (valor === this.nombre) return
    this.nombre = valor
    this.changeDetectorRef.markForCheck()
  }

  public saluda(): void {
    // this.resultado = `Hola ${this.Nombre}`
    this.sinVincular = `Hola ${this.Nombre}`
  }
  public despide() {
    this.resultado = `Adios ${this.Nombre}`
  }
  public di(algo: string) {
    this.resultado = `Dice ${algo}`
  }

  cambia() {
    this.visible = !this.visible
    this.estetica.importante = !this.estetica.importante
    this.estetica.error = !this.estetica.error
  }

  cont = 0
  calcula(a: number, b: number): number {
    this.log.log(`ejecuta calcula ${this.cont++}`)
    return a + b
  }

  add(provincia: string) {
    const id = this.listado[this.listado.length - 1].id + 1
    this.listado.push({ id, nombre: provincia })
    this.idProvincia = id
  }

  idiomas = [
    { codigo: 'en-US', region: 'USA' },
    { codigo: 'es', region: 'España' },
    { codigo: 'pt', region: 'Portugal' },
  ];
  idioma = this.idiomas[0].codigo;
  calculos: Array<Calculo> = [];
  valCalculadora = 777;

  ponResultado(origen: string, valor: number) {
    this.calculos.push({
      pos: this.calculos.length + 1,
      origen,
      valor
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.suscriptor = this.vm.Notificacion.subscribe(n => {
      if (n.Type !== NotificationType.error) { return; }
      window.alert(`Suscripcion: ${n.Message}`);
      this.vm.remove(this.vm.Listado.length - 1);
    });
  }
  ngOnDestroy(): void {
    if (this.suscriptor) {
      this.suscriptor.unsubscribe();
    }
  }
  progress = 0;
  inZone() {
    this.progress = 0
    const interval = setInterval(() => {
      this.progress++
      if (this.progress >= 1000) {
        clearInterval(interval)
        console.log('end interval');
      }
    }, 10)
  }
  outZone() {
    this.progress = 0
    this.ngZone.runOutsideAngular(() => {
      const interval = setInterval(() => {
        if (this.progress % 10)
          this.progress++
        else
          this.ngZone.run(() => this.progress++)
        if (this.progress >= 1000) {
          clearInterval(interval)
          console.log('end interval');
          this.ngZone.run(() => this.progress = 1000)
        }
      }, 10)
    })
  }
}
interface Calculo {
  pos: number
  origen: string
  valor: number
}
