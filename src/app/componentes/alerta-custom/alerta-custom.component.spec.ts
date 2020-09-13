import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaCustomComponent } from './alerta-custom.component';

describe('AlertaCustomComponent', () => {
  let component: AlertaCustomComponent;
  let fixture: ComponentFixture<AlertaCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
