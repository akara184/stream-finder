import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AltaComponent } from './alta/alta.component';
import { ProcurarComponent } from './procurar/procurar.component';
import { ListaComponent } from './lista/lista.component';
import { HomeModule } from './home/home.module';
import { AltaModule } from './alta/alta.module';
import { ProcurarModule } from './procurar/procurar.module';
import { ListaModule } from './lista/lista.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { DadosComponent } from './dados/dados.component';
import { DadosModule } from './dados/dados.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'alta',
    component: AltaComponent
  },
  {
    path: 'procurar',
    component: ProcurarComponent
  },
  {
    path: 'lista',
    component: ListaComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'filme/:id',
    component: DadosComponent
  },
  {
    path: 'serie/:id',
    component: DadosComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HomeModule,
    AltaModule,
    ProcurarModule,
    ListaModule,
    LoginModule,
    DadosModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
