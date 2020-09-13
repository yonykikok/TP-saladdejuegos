import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardJuegoComponent } from './card-juego.component';

describe('CardJuegoComponent', () => {
  let component: CardJuegoComponent;
  let fixture: ComponentFixture<CardJuegoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardJuegoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
