import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailResetPassComponent } from './mail-reset-pass.component';

describe('MailResetPassComponent', () => {
  let component: MailResetPassComponent;
  let fixture: ComponentFixture<MailResetPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailResetPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailResetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
