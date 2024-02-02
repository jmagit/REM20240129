import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, NgZone, computed, effect, inject, signal } from '@angular/core';


@Component({
  selector: 'app-deteccion',
  standalone: true,
  imports: [],
  templateUrl: './deteccion.component.html',
  styleUrl: './deteccion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeteccionComponent {
  private injector = inject(Injector)

  private progress = 0;
  simple = signal(0)
  doble = computed(() => this.simple() * 2)
  cont = 0
  obj = { count: 0}

  get Progress() {
    return this.progress;
  }
  set Progress(value: number) {
    this.progress = value;
    if(this.progress % 100 === 0)
      this.detector.detectChanges()
    // this.simple.set(value)
  }

  constructor(private ngZone: NgZone, public detector: ChangeDetectorRef) {
    effect(() => {
      //this.cont = 1
      console.log(`Doble ${this.doble()}`)
    })
  }

  inZone() {
    this.Progress = 0
    const interval = setInterval(() => {
      this.Progress++
      if (this.Progress >= 1000) {
        clearInterval(interval)
        console.log('end interval');
        this.detector.detectChanges()
      }
    }, 10)
  }
  outZone() {
    this.Progress = 0
    this.ngZone.runOutsideAngular(() => {
      const interval = setInterval(() => {
        if (this.Progress % 100)
          this.Progress++
        else
          this.ngZone.run(() => this.Progress++)
        if (this.Progress >= 1000) {
          clearInterval(interval)
          console.log('end interval');
          this.ngZone.run(() => this.Progress = 1000)
        }
      }, 10)
    })
  }
  inSign() {
    this.simple.set(0)
    const interval = setInterval(() => {
      this.simple.update(old => old + 1)
      if (this.simple() >= 1000) {
        clearInterval(interval)
        console.log('end interval');
      }
    }, 10)
  }

  inc() {
    this.cont++
    // this.cont2.update(old => old + 1)
  }
  dec() {
    effect(() => {
      // this.cont = 1
      console.log(`Doble ${this.doble()}`)
    }, {injector: this.injector})
  }
}
