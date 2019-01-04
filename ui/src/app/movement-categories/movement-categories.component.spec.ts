import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementCategoriesComponent } from './movement-categories.component';

describe('MovementCategoriesComponent', () => {
  let component: MovementCategoriesComponent;
  let fixture: ComponentFixture<MovementCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
