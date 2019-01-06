import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovementCategoryComponent } from './edit-movement-category.component';

describe('EditMovementCategoryComponent', () => {
  let component: EditMovementCategoryComponent;
  let fixture: ComponentFixture<EditMovementCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMovementCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovementCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
