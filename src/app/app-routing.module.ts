import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { CreateTecnicoComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { UpdateTecnicoComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { CreateClienteComponent } from './components/cliente/cliente-create/cliente-create.component';
import { UpdateClienteComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },


      { path: 'tecnico', component: TecnicoListComponent },
      { path: 'tecnico/create', component: CreateTecnicoComponent },
      { path: 'tecnico/update/:id', component: UpdateTecnicoComponent },


      { path: 'cliente', component: ClienteListComponent },
      { path: 'cliente/create', component: CreateClienteComponent },
      { path: 'cliente/update/:id', component: UpdateClienteComponent },


      { path: 'chamado', component: ChamadoListComponent },
      { path: 'chamado/create', component: ChamadoCreateComponent },
      { path: 'chamado/update', component: ChamadoUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
