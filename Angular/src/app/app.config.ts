import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
registerLocaleData(localeEs, 'es', localeEsExtra);

import { NotRouteReuseStrategy, routes } from './app.routes';
import { ERROR_LEVEL /*, LoggerService*/ } from '@my/core';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { ajaxWaitInterceptor } from './main';
import { AuthInterceptor } from './security';

export const appConfig: ApplicationConfig = {
  providers: [
    // LoggerService,
    { provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd/MMM/yy' } },
    // { provide: HTTP_INTERCEPTORS, useClass: AjaxWaitInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
    provideHttpClient(withInterceptorsFromDi() , withInterceptors([ajaxWaitInterceptor])),
    {provide: RouteReuseStrategy, useClass: NotRouteReuseStrategy},
    provideRouter(routes, withComponentInputBinding())
  ]
};
