import { browser, element, by } from 'protractor';

export class CalculadoraPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeaderText() {
    return element(by.css('app-root h4.header.title')).getText();
  }
}
