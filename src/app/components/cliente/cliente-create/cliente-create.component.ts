import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
@Component({
  selector: 'app-create-cliente',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class CreateClienteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCadatro: ''
  };

  form = new FormGroup({
    admin: new FormControl(false),
    nome: new FormControl(null, Validators.minLength(3)),
    cpf: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email),
    senha: new FormControl(null, Validators.minLength(3))
  });

  constructor(private service: ClienteService, private toast: ToastrService, private route: Router) {

  }

  ngOnInit(): void {
  }

  crate(): void {
    this.service.create(this.cliente).subscribe(res => {
      this.toast.success("Usuario cadastrado com sucesso")
      this.route.navigate(['/cliente'])
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message)
        });
      } else {
        this.toast.error(ex.error.message)
      }
    })
  }

  addPerfil(perfil: any) {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1)
    } else {
      this.cliente.perfis.push(perfil)
    }
  }

  validarCampos(): boolean {
    return this.form.valid
  }

}
