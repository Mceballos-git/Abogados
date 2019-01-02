import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashItemsComponent } from './cash-items.component';

describe('CashItemsComponent', () => {
  let component: CashItemsComponent;
  let fixture: ComponentFixture<CashItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
