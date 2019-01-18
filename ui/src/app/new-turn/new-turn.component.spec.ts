import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTurnComponent } from './new-turn.component';

describe('NewTurnComponent', () => {
  let component: NewTurnComponent;
  let fixture: ComponentFixture<NewTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
