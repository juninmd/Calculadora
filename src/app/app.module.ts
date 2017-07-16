import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { PorcentagemComponent } from './pages/porcentagem/porcentagem.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';
import { SuporteComponent } from './pages/suporte/suporte.component';
import { HomeComponent } from './pages/home/home.component';
import { MensalComponent } from './pages/mensal/mensal.component';

@NgModule({
  declarations: [
    AppComponent,
    PorcentagemComponent,
    RelatorioComponent,
    SuporteComponent,
    HomeComponent,
    MensalComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
