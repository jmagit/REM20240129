import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteCanvasComponent } from './remote-canvas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RemoteCanvasComponent', () => {
  let component: RemoteCanvasComponent;
  let fixture: ComponentFixture<RemoteCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteCanvasComponent, HttpClientTestingModule ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RemoteCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
