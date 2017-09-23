import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustoComponent } from './custo.component';

describe('CustoComponent', () => {
  let component: CustoComponent;
  let fixture: ComponentFixture<CustoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
