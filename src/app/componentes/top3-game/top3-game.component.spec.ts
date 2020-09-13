import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top3GameComponent } from './top3-game.component';

describe('Top3GameComponent', () => {
  let component: Top3GameComponent;
  let fixture: ComponentFixture<Top3GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top3GameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top3GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
