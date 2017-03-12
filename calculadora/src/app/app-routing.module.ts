import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PorcentagemComponent } from './pages/porcentagem/porcentagem.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';
import { SuporteComponent } from './pages/suporte/suporte.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'porcentagem', component: PorcentagemComponent },
            { path: 'relatorio', component: RelatorioComponent },
            { path: 'suporte', component: SuporteComponent },
            { path: 'home', component: HomeComponent },
            { path: '', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
