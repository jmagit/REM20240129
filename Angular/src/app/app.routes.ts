import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, Routes, UrlSegment } from '@angular/router';
import { ContactosListComponent, ContactosViewComponent, ContactosEditComponent, ContactosAddComponent } from './contactos';
import { CalculadoraComponent } from './ejemplos/calculadora/calculadora.component';
import { DemosComponent } from './ejemplos/demos/demos.component';
import { HomeComponent, PageNotFoundComponent } from './main';
import { AuthWithRedirectCanActivate, AuthCanActivateFn, InRoleCanActivateChild, LoginFormComponent, RegisterUserComponent } from './security';
import { DeteccionComponent } from './deteccion/deteccion.component';

// Para que no reutilice los componentes si la ruta llega al mismo componente
export class NotRouteReuseStrategy extends BaseRouteReuseStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean { return false; }
}

export function svgFiles(url: UrlSegment[]) {
  return url.length === 1 && url[0].path.endsWith('.svg') ? ({ consumed: url }) : null;
}

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'demos', component: DemosComponent /*, canActivate: [AuthWithRedirectCanActivate('/login')]*/ },
  { path: 'chisme/de/hacer/numeros', component: CalculadoraComponent, title: 'Calculadora' /*, canActivate: [AuthCanActivateFn]*/ },
  // { path: 'contactos', component: ContactosComponent },
  { path: 'contactos', component: ContactosListComponent, canActivate: [AuthWithRedirectCanActivate('/login')] },
  { path: 'contactos/add', component: ContactosAddComponent, canActivate: [AuthCanActivateFn] },
  { path: 'contactos/:id/edit', component: ContactosEditComponent, canActivate: [AuthCanActivateFn] },
  { path: 'contactos/:id', component: ContactosViewComponent, canActivate: [AuthCanActivateFn] },
  { path: 'contactos/:id/:kk', component: ContactosViewComponent },
  { path: 'alysia/baxendale', redirectTo: '/contactos/43' },
  // { path: 'libros', children: [
  //   { path: '', component: LibrosComponent },
  //   { path: 'add', component: LibrosComponent },
  //   { path: ':id/edit', component: LibrosComponent },
  //   { path: ':id', component: LibrosComponent },
  //   { path: ':id/:kk', component: LibrosComponent },
  // ]},
  // { matcher: svgFiles, component: GraficoSvgComponent },
  { matcher: svgFiles, loadComponent: () => import('../lib/my-core/components/grafico-svg/grafico-svg.component') },
  { path: 'libros', loadChildren: () => import('./libros/libros.module').then(mod => mod.LibrosModule), canActivateChild: [InRoleCanActivateChild('Empleados')] },
  { path: 'config', loadChildren: () => import('./config/config.module') },
  { path: 'login', component: LoginFormComponent },
  { path: 'registro', component: RegisterUserComponent },
  { path: 'ws',  loadChildren: () => import('./web-socket/web-socket.module').then(mod => mod.WebSocketModule)},
  { path: 'onpush', component: DeteccionComponent },
  { path: '404.html', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404.html' }
];
