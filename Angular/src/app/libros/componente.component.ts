/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ErrorMessagePipe, TypeValidator } from '@my/core';
import { LibrosViewModelService } from './servicios.service';
import { Subscription } from 'rxjs';
import { FormButtonsComponent } from "../common-component";

@Component({
  selector: 'app-libros',
  templateUrl: './tmpl-anfitrion.component.html',
  styleUrls: ['./componente.component.css'],
  // providers: [LibrosViewModelService]
  standalone: true,
  imports: [
    forwardRef(() => LibrosAddComponent),
    forwardRef(() => LibrosEditComponent),
    forwardRef(() => LibrosViewComponent),
    forwardRef(() => LibrosListComponent),
  ],
})
export class LibrosComponent implements OnInit, OnDestroy {
  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void {
    // this.vm.list();
    this.vm.load()
  }
  ngOnDestroy(): void { this.vm.clear(); }
}

/*
@Component({
  selector: 'app-libros-list',
  templateUrl: './tmpl-list.sin-rutas.component.html',
  styleUrls: ['./componente.component.css'],
  standalone: true,
  imports: [PaginatorModule]
})
export class LibrosListComponent implements OnInit, OnDestroy {
  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}
@Component({
  selector: 'app-libros-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css'],
  standalone: true,
  imports: [FormsModule, TypeValidator, ErrorMessagePipe]
})
export class LibrosAddComponent implements OnInit {
  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void { }
}
@Component({
  selector: 'app-libros-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./componente.component.css'],
  standalone: true,
  imports: [FormsModule, TypeValidator, ErrorMessagePipe]
})
export class LibrosEditComponent implements OnInit, OnDestroy {
  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}
@Component({
  selector: 'app-libros-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./componente.component.css'],
  standalone: true,
  imports: [DatePipe]
})
export class LibrosViewComponent implements OnInit, OnDestroy {
  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
}
*/

@Component({
    selector: 'app-libros-list',
    templateUrl: './tmpl-list.con-rutas.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [RouterLink, PaginatorModule, NgFor]
})
export class LibrosListComponent implements OnChanges, OnDestroy {
  @Input() page = 0

  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  // ngOnInit(): void {
  //   // this.vm.list();
  //   this.vm.load()
  // }
  ngOnChanges(_changes: SimpleChanges): void {
    this.vm.load(this.page)
  }
  ngOnDestroy(): void { this.vm.clear(); }
}
@Component({
    selector: 'app-libros-add',
    templateUrl: './tmpl-form.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [FormsModule, TypeValidator, ErrorMessagePipe, FormButtonsComponent]
})
export class LibrosAddComponent implements OnInit {
  constructor(protected vm: LibrosViewModelService) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void {
    this.vm.add();
  }
}
@Component({
    selector: 'app-libros-edit',
    templateUrl: './tmpl-form.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [FormsModule, TypeValidator, ErrorMessagePipe, FormButtonsComponent, RouterLink]
})
export class LibrosEditComponent implements OnInit, OnDestroy {
  private obs$?: Subscription;
  constructor(protected vm: LibrosViewModelService,
    protected route: ActivatedRoute, protected router: Router) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnInit(): void {
    this.obs$ = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const id = parseInt(params?.get('id') ?? '');
        if (id) {
          this.vm.edit(id);
        } else {
          this.router.navigate(['/404.html']);
        }
      });
  }
  ngOnDestroy(): void {
    this.obs$!.unsubscribe();
  }
}
@Component({
    selector: 'app-libros-view',
    templateUrl: './tmpl-view.component.html',
    styleUrls: ['./componente.component.css'],
    standalone: true,
    imports: [DatePipe, FormButtonsComponent, RouterLink]
})
export class LibrosViewComponent implements OnChanges {
  @Input() id?: string;
  constructor(protected vm: LibrosViewModelService, protected router: Router) { }
  public get VM(): LibrosViewModelService { return this.vm; }
  ngOnChanges(_changes: SimpleChanges): void {
    if (this.id) {
      this.vm.view(+this.id);
    } else {
      this.router.navigate(['/404.html']);
    }
  }
}


export const LIBROS_COMPONENTES = [
  // LibrosComponent,
  LibrosListComponent, LibrosAddComponent, LibrosEditComponent, LibrosViewComponent,
];
