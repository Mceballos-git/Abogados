import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMovementCategoryComponent } from './new-movement-category.component';

describe('NewMovementCategoryComponent', () => {
  let component: NewMovementCategoryComponent;
  let fixture: ComponentFixture<NewMovementCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMovementCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMovementCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
