import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-create-tecnico',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class CreateTecnicoComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCadatro: '',
    especialidade: '',
    anosExp: ''
  };

  form = new FormGroup({
    admin: new FormControl(false),
    nome: new FormControl(null, Validators.minLength(3)),
    cpf: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email),
    senha: new FormControl(null, Validators.minLength(3)),
    especialidade: new FormControl(null, Validators.required),
    anosExp: new FormControl(null, Validators.required)
  });

  constructor(private service: TecnicoService, private toast: ToastrService, private route: Router) {

  }

  ngOnInit(): void {
  }

  crate(): void {
    debugger
    this.service.create(this.tecnico).subscribe(() => {
      this.toast.success("Técnico cadastrado com sucesso")
      this.route.navigate(['/tecnico'])
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
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)
    } else {
      this.tecnico.perfis.push(perfil)
    }
  }

  validarCampos(): boolean {
    return this.form.controls['email'].valid &&
      this.form.controls['senha'].valid &&
      this.form.controls['cpf'].valid &&
      this.form.controls['nome'].valid &&
      this.form.controls['especialidade'].valid &&
      this.form.controls['anosExp'].valid
  }

}