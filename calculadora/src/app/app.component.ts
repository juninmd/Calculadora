import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private outros: any = [];

  private adicionar() {
    this.outros.push({
      valor: 0,
      descricao: ''
    });
  }

  private remover(item: any) {
    this.outros.splice(this.outros.indexOf(item), 1);
  }
}
