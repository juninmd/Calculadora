import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let toastSpy: jasmine.Spy;

  beforeEach(async(() => {
    toastSpy = jasmine.createSpy('toast');
    (global as any).Materialize = { toast: toastSpy };

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('limpar should clear all stored data and show toast', () => {
    localStorage.setItem('custo', '{}');
    localStorage.setItem('relatorio', '{}');
    sessionStorage.setItem('tempRelatorio', '{}');

    component.limpar();

    expect(localStorage.getItem('custo')).toBeNull();
    expect(localStorage.getItem('relatorio')).toBeNull();
    expect(sessionStorage.getItem('tempRelatorio')).toBeNull();
    expect(toastSpy).toHaveBeenCalledWith(jasmine.stringMatching(/limpos/), 4000);
  });

  it('limpar should not throw when storage is already empty', () => {
    expect(() => component.limpar()).not.toThrow();
    expect(toastSpy).toHaveBeenCalled();
  });
});
