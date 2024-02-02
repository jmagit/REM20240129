/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ErrorMessagePipe } from '../pipes/cadenas.pipe';

@Directive({
  selector: `[myWinConfirm]`,
  standalone: true
})
export class WindowConfirmDirective {
  @Output('myWinConfirm') winConfirm: EventEmitter<unknown> = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('myWinConfirmMessage') winConfirmMessage = '¿Seguro?';
  @HostBinding('class.pressed') isPressed: boolean = false;

  @HostListener('click', ['$event'])
  confirmFirst() {
    if (window.confirm(this.winConfirmMessage)) {
      this.winConfirm.emit(null);
    }
  }
  @HostListener('mousedown') hasPressed() { this.isPressed = true; }
  @HostListener('mouseup') hasReleased() { this.isPressed = false; }
}

@Directive({
  selector: '[show]',
  standalone: true
})
export class ShowDirective {
  @HostBinding() hidden: boolean = false;
  @Input() set show(value: boolean) { this.hidden = !value; }
}

@Directive({ selector: '[scrollIntoView]' })
export class ScrollIntoViewDirective {
  @Input() set scrollIntoView(value: boolean) {
    if (value)
      this.el.nativeElement.scrollIntoView({ block: "end", behavior: "smooth" });
  }
  constructor(private el: ElementRef) { }
}


@Directive({
  selector: '[focused]',
  standalone: true
})
export class FocusedDirective {
  @Input() set focused(value: boolean) { if (value) this.el.nativeElement.focus(); }
  constructor(private el: ElementRef) {
  }
}

@Directive({
  selector: '[myShowErrors]',
  standalone: true
})
export class ShowErrorsDirective implements OnChanges {
  private pipe = new ErrorMessagePipe();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input('myShowErrors') errors: any = undefined;
  @HostBinding('textContent') mensaje: string = '';
  @HostBinding('hidden') hidden: boolean = false;

  ngOnChanges(_changes: SimpleChanges): void {
    if (!this.errors) {
      this.hidden = true;
      return;
    }
    this.mensaje = this.pipe.transform(this.errors);
    this.hidden = this.mensaje === '';
  }
}


export const DIRECTIVAS_ATRIBUTO = [WindowConfirmDirective, ShowDirective, ShowErrorsDirective, FocusedDirective, ScrollIntoViewDirective,]
