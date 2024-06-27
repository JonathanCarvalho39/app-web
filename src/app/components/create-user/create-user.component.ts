import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';




@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {



  pessoa: Pessoa = {
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
    tecnico: new FormControl(false, Validators.required),
    nome: new FormControl(null, Validators.minLength(3)),
    cpf: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email),
    senha: new FormControl(null, Validators.minLength(3))
  });

  constructor(private service: PessoaService, private toast: ToastrService) {

  }

  ngOnInit(): void {
  }

  crate(): void {
    let tipoPessoa = this.form.controls['tecnico'].value ? 'tecnicos' : 'clientes'
    this.service.create(this.pessoa, tipoPessoa).subscribe(res => {
      this.toast.success("Usuario cadastrado com sucesso")
    }, ex => {
      if (ex.error.errors) {
        debugger
        ex.error.errors.forEach(element => {
          this.toast.error(element.message)
        });
      } else {
        debugger
        this.toast.error(ex.error.message)
      }
    })
  }

  addPerfil(perfil: any) {
    if (this.pessoa.perfis.includes(perfil)) {
      this.pessoa.perfis.splice(this.pessoa.perfis.indexOf(perfil))
    } else {
      this.pessoa.perfis.push(perfil)
    }
  }

  validarCampos(): boolean {
    return this.form.controls['email'].valid &&
      this.form.controls['senha'].valid &&
      this.form.controls['cpf'].valid &&
      this.form.controls['nome'].valid
  }

}
