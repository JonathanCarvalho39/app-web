import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
    private service: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.service.autenticar(this.creds).subscribe(resp => {


      this.toast.info(resp.headers.get('Authorization'))
    }, () => {


      this.toast.error('Usuario e/ou senha invalidos')
    })
  }

  validarCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}
