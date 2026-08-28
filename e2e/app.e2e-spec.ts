import { CalculadoraPage } from './app.po';

describe('calculadora App', () => {
  let page: CalculadoraPage;

  beforeEach(() => {
    page = new CalculadoraPage();
  });

  it('should display the application header', () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('Sistema de Informação');
  });
});
