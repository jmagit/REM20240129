import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemosComponent } from './demos.component';
import { ERROR_LEVEL } from '@my/core';

describe('DemosComponent', () => {
  let component: DemosComponent;
  let fixture: ComponentFixture<DemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: ERROR_LEVEL, useValue: 0 }],
      imports: [DemosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
