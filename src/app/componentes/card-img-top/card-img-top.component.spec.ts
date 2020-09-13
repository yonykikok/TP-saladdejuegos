import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImgTopComponent } from './card-img-top.component';

describe('CardImgTopComponent', () => {
  let component: CardImgTopComponent;
  let fixture: ComponentFixture<CardImgTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardImgTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardImgTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
