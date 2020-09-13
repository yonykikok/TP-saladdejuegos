import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrabadorDeVozComponent } from './grabador-de-voz.component';

describe('GrabadorDeVozComponent', () => {
  let component: GrabadorDeVozComponent;
  let fixture: ComponentFixture<GrabadorDeVozComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrabadorDeVozComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrabadorDeVozComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
