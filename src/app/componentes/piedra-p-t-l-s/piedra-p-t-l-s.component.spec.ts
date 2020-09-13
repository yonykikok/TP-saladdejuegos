import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiedraPTLSComponent } from './piedra-p-t-l-s.component';

describe('PiedraPTLSComponent', () => {
  let component: PiedraPTLSComponent;
  let fixture: ComponentFixture<PiedraPTLSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiedraPTLSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiedraPTLSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
