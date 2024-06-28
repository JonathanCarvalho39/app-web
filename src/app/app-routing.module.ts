import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { CreateTecnicoComponent } from './components/tecnico/create-tecnico/create-tecnico.component';
import { UpdateTecnicoComponent } from './components/tecnico/update-tecnico/update-tecnico.component';
import { CreateClienteComponent } from './components/cliente/create-cliente/create-cliente.component';
import { UpdateClienteComponent } from './components/cliente/update-cliente/update-cliente.component';

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
      { path: 'cliente/update/:id', component: UpdateClienteComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
