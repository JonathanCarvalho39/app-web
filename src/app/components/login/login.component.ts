import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credecial } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credecial = {
    email: '',
    senha: ''
  };

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.service.autenticar(this.creds).subscribe(resp => {
      const token = resp.headers.get('Authorization')?.substring(7);
      if (token) {
        this.router.navigate(['home'])
      } else {
        this.toast.error('Erro ao obter o token de autenticação');
      }
    }, () => {
      this.toast.error('Usuario e/ou senha invalidos');
    });
  } 

  validarCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}
