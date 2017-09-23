import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CustoComponent } from './pages/custo/custo.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';
import { SuporteComponent } from './pages/suporte/suporte.component';
import { HomeComponent } from './pages/home/home.component';
import { MensalComponent } from './pages/mensal/mensal.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'custo', component: CustoComponent },
            { path: 'relatorio', component: RelatorioComponent },
            { path: 'suporte', component: SuporteComponent },
            { path: 'home', component: HomeComponent },
            { path: 'mensal', component: MensalComponent },
            { path: '', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
