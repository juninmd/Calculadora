import { CalculadoraPage } from './app.po';

describe('calculadora App', () => {
  let page: CalculadoraPage;

  beforeEach(() => {
    page = new CalculadoraPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
