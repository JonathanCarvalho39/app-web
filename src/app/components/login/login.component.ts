import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credecial } from 'src/app/models/credenciais';

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

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.creds.senha = ''
    this.toast.success('Login efetuado com Sucesso!', 'Login')
  }

  validarCampos(): boolean {
    if (this.email.valid && this.senha.valid) {
      return true;
    }
    return false;
  }
}
