/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { LoggerService } from '@my/core';
import { DAOServiceMock } from '../base-code';
import { NavigationService, NotificationService } from '../common-services';

import { LibrosDAOService, LibrosViewModelService } from './servicios.service';
import { NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LIBROS_COMPONENTES } from './componente.component';

export interface Libro {
  idLibro: string
  titulo: string
  autor: string
  pais: string
  fecha: string
  paginas: string
  wiki: string
}

describe('Modulo Libros', () => {
  const apiURL = environment.apiURL + 'libros'
  const dataMock = [
    {
      "idLibro":"1",
      "titulo":"El ingenioso hidalgo don Quijote de la Mancha ",
      "autor":"Miguel de Cervantes",
      "pais":"España",
      "fecha":"1605",
      "paginas":"377",
      "wiki":"https://es.wikipedia.org/wiki/Don_Quijote_de_la_Mancha"
  },
  {
      "idLibro":"2",
      "titulo":"Diario de Ana Frank",
      "autor":"Anne Frank ",
      "pais":"Países Bajos",
      "fecha":"1947",
      "paginas":"217",
      "wiki":"https://es.wikipedia.org/wiki/Diario_de_Ana_Frank"
  },
  {
      "idLibro":"3",
      "titulo":"Cien años de soledad",
      "autor":"Gabriel García Márquez",
      "pais":"Colombia",
      "fecha":"1967",
      "paginas":"471",
      "wiki":"https://es.wikipedia.org/wiki/Cien_a%C3%B1os_de_soledad"
  },
  {
      "idLibro":"4",
      "titulo":"Viaje al centro de la Tierra",
      "autor":"Julio Verne",
      "pais":"Francia",
      "fecha":"1864",
      "paginas":"360",
      "wiki":"https://es.wikipedia.org/wiki/Viaje_al_centro_de_la_Tierra"
  },
  ];
  const dataAddMock: { [index: string]: any } = { idLibro:"0", titulo: "Más falso que un político" }
  const dataEditMock: { [index: string]: any } = { idLibro:"1", titulo: "Más falso que un político" }
  const dataBadMock: { [index: string]: any } = { idLibro: "-1" }

  describe('DAOService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [LibrosDAOService, HttpClient],
      });
    });

    it('query', inject([LibrosDAOService, HttpTestingController], (dao: LibrosDAOService, httpMock: HttpTestingController) => {
      dao.query().subscribe({
          next: data => {
            expect(data.length).toEqual(dataMock.length);
          },
          error: () => { fail('has executed "error" callback'); }
        });
      const req = httpMock.expectOne(apiURL);
      expect(req.request.method).toEqual('GET');
      req.flush([...dataMock]);
      httpMock.verify();
    }));

    it('get', inject([LibrosDAOService, HttpTestingController], (dao: LibrosDAOService, httpMock: HttpTestingController) => {
      dao.get(1).subscribe({
          next: data => {
            expect(data).toEqual(dataMock[0]);
          },
          error: () => { fail('has executed "error" callback'); }
        });
      const req = httpMock.expectOne(`${apiURL}/1`);
      expect(req.request.method).toEqual('GET');
      req.flush({ ...dataMock[0] });
      httpMock.verify();
    }));

    it('add', inject([LibrosDAOService, HttpTestingController], (dao: LibrosDAOService, httpMock: HttpTestingController) => {
      const item = {...dataAddMock} as Libro;
      dao.add(item).subscribe();
      const req = httpMock.expectOne(`${apiURL}`);
      expect(req.request.method).toEqual('POST');
      for (const key in dataEditMock) {
        if (Object.prototype.hasOwnProperty.call(dataAddMock, key)) {
          expect(req.request.body[key]).toEqual(dataAddMock[key]);
        }
      }
      httpMock.verify();
    }));

    it('change', inject([LibrosDAOService, HttpTestingController], (dao: LibrosDAOService, httpMock: HttpTestingController) => {
      const item = { ...dataEditMock } as Libro;
      dao.change(1, item).subscribe();
      const req = httpMock.expectOne(`${apiURL}/1`);
      expect(req.request.method).toEqual('PUT');
      for (const key in dataEditMock) {
        if (Object.prototype.hasOwnProperty.call(dataEditMock, key)) {
          expect(req.request.body[key]).toEqual(dataEditMock[key]);
        }
      }
      httpMock.verify();
    }));

    it('delete', inject([LibrosDAOService, HttpTestingController], (dao: LibrosDAOService, httpMock: HttpTestingController) => {
      dao.remove(1).subscribe();
      const req = httpMock.expectOne(`${apiURL}/1`);
      expect(req.request.method).toEqual('DELETE');
      httpMock.verify();
    }));

  });
  describe('ViewModelService', () => {
    let service: LibrosViewModelService;
    let dao: LibrosDAOService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [NotificationService, LoggerService,
          {
            provide: LibrosDAOService, useFactory: () => new DAOServiceMock<Libro, number>([...dataMock])
          }
        ],
      });
      service = TestBed.inject(LibrosViewModelService);
      dao = TestBed.inject(LibrosDAOService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('mode', () => {
      it('list', fakeAsync(() => {
        service.list()
        tick()
        expect(service.Listado.length).withContext('Verify Listado length').toBe(dataMock.length)
        expect(service.Modo).withContext('Verify Modo is ').toBe('list')
      }))

      it('add', () => {
        service.add()
        expect(service.Elemento).withContext('Verify Elemento').toEqual({})
        expect(service.Modo).withContext('Verify Modo is add').toBe('add')
      })

      describe('edit', () => {
        it(' OK', fakeAsync(() => {
          service.edit(3)
          tick()

          expect(service.Elemento).withContext('Verify Elemento').toEqual(dataMock[2])
          expect(service.Modo).withContext('Verify Modo is edit').toBe('edit')
        }))

        it('KO', fakeAsync(() => {
          const notify = TestBed.inject(NotificationService);
          spyOn(notify, 'add')

          service.edit(dataMock.length + 1)
          tick()

          expect(notify.add).withContext('notify error').toHaveBeenCalled()
        }))
      })

      describe('view', () => {
        it(' OK', fakeAsync(() => {
          service.view(1)
          tick()

          expect(service.Elemento).withContext('Verify Elemento').toEqual(dataMock[0])
          expect(service.Modo).withContext('Verify Modo is view').toBe('view')
        }))

        it('KO', fakeAsync(() => {
          const notify = TestBed.inject(NotificationService);
          spyOn(notify, 'add')

          service.view(dataMock.length + 1)
          tick()

          expect(notify.add).withContext('notify error').toHaveBeenCalled()
        }))
      })

      describe('delete', () => {
        it('accept confirm', fakeAsync(() => {
          spyOn(window, 'confirm').and.returnValue(true)
          service.delete(3)
          tick()
          expect(service.Listado.length).withContext('Verify Listado length').toBe(dataMock.length - 1)
          expect(service.Modo).withContext('Verify Modo is list').toBe('list')
        }))

        xit('reject confirm', fakeAsync(() => {
          spyOn(window, 'confirm').and.returnValue(false)
          service.delete(+ 1)
          tick()
          expect((dao as { [i: string]: any })['listado'].length).withContext('Verify Listado length').toBe(dataMock.length)
        }))

        it('KO', fakeAsync(() => {
          spyOn(window, 'confirm').and.returnValue(true)
          const notify = TestBed.inject(NotificationService);
          spyOn(notify, 'add')

          service.delete(dataMock.length + 1)
          tick()

          expect(notify.add).withContext('notify error').toHaveBeenCalled()
        }))
      })
    })

    it('cancel', fakeAsync(() => {
      const navigation = TestBed.inject(NavigationService);
      spyOn(navigation, 'back')
      service.edit(2)
      tick()
      expect(service.Elemento).withContext('Verifica fase de preparación').toBeDefined()
      service.cancel()
      expect(service.Elemento).withContext('Verify Elemento').toEqual({})
      expect(navigation.back).toHaveBeenCalled()
    }))

    describe('send', () => {
      describe('add', () => {
        it('OK', fakeAsync(() => {
          spyOn(service, 'cancel')
          service.add()
          tick()
          expect(service.Elemento).toBeDefined()
          const ele = {} as any;
          for (const key in dataAddMock) {
            service.Elemento![key] = dataAddMock[key];
            ele[key] = dataAddMock[key];
          }
          service.send()
          tick()
          const listado = (dao as { [i: string]: any })['listado']
          expect(listado.length).toBe(dataMock.length + 1)
          expect(listado[listado.length - 1]).toEqual(ele)
          expect(service.cancel).withContext('Verify init ViewModel').toHaveBeenCalled()
        }))
        it('KO', fakeAsync(() => {
          const notify = TestBed.inject(NotificationService);
          spyOn(notify, 'add')
          service.add()
          tick()
          expect(service.Elemento).toBeDefined()
          for (const key in dataBadMock) {
            service.Elemento![key] = dataBadMock[key];
          }
          service.send()
          tick()
          expect(notify.add).withContext('notify error').toHaveBeenCalled()
        }))
      })

      describe('edit', () => {
        it('OK', fakeAsync(() => {
          spyOn(service, 'cancel')
          service.edit(1)
          tick()
          expect(service.Elemento).toBeDefined()
          for (const key in dataEditMock) {
            service.Elemento![key] = dataEditMock[key];
          }
          service.send()
          tick()
          const listado = (dao as { [i: string]: any })['listado']
          expect(listado.length).withContext('Verify Listado length').toBe(dataMock.length)
          expect(listado[0]).withContext('Verify Elemento').toEqual(service.Elemento)
          expect(service.cancel).withContext('Verify init ViewModel').toHaveBeenCalled()
        }))
        it('KO', fakeAsync(() => {
          const notify = TestBed.inject(NotificationService);
          spyOn(notify, 'add')
          service.edit(1)
          tick()
          expect(service.Elemento).toBeDefined()
          for (const key in dataBadMock) {
            service.Elemento![key] = dataBadMock[key];
          }
          (dao as { [i: string]: any })['listado'].splice(0)
          service.send()
          tick()
          expect(notify.add).withContext('notify error').toHaveBeenCalled()
        }))
      })
    })

  });
  describe('Componentes', () => {
    LIBROS_COMPONENTES.forEach(componente => {
      describe(componente.name, () => {
        let component: any;
        let fixture: ComponentFixture<any>;

        beforeEach(async () => {
          await TestBed.configureTestingModule({
                providers: [NotificationService, LoggerService, LibrosViewModelService],
                imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, componente],
                schemas: [NO_ERRORS_SCHEMA]
            })
            .compileComponents();
        });

        beforeEach(() => {
          const vm = TestBed.inject(LibrosViewModelService)
          vm.add()
          fixture = TestBed.createComponent(componente as Type<any>);
          component = fixture.componentInstance;
          fixture.detectChanges();
        });

        it('should create', () => {
          expect(component).toBeTruthy();
        });
      });

    })
  })
});
