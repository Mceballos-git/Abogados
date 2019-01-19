import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsCategoriesComponent } from './movements-categories.component';

describe('MovementsCategoriesComponent', () => {
  let component: MovementsCategoriesComponent;
  let fixture: ComponentFixture<MovementsCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
