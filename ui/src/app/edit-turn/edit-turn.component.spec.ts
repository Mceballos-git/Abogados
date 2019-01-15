import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTurnComponent } from './edit-turn.component';

describe('EditTurnComponent', () => {
  let component: EditTurnComponent;
  let fixture: ComponentFixture<EditTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
