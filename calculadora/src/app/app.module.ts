import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize'
import { AppComponent } from './app.component';
import { PorcentagemComponent } from './pages/porcentagem/porcentagem.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';
import { SuporteComponent } from './pages/suporte/suporte.component';

@NgModule({
  declarations: [
    AppComponent,
    PorcentagemComponent,
    RelatorioComponent,
    SuporteComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
