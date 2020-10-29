import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankParametersComponent } from './bank-parameters.component';

describe('BankParametersComponent', () => {
  let component: BankParametersComponent;
  let fixture: ComponentFixture<BankParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
