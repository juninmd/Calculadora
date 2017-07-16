import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalComponent } from './mensal.component';

describe('MensalComponent', () => {
  let component: MensalComponent;
  let fixture: ComponentFixture<MensalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
