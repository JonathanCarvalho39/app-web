import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-create-tecnico',
  templateUrl: './create-tecnico.component.html',
  styleUrls: ['./create-tecnico.component.css']
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
    anosExp: null
  };

  form = new FormGroup({
    admin: new FormControl(false),
    nome: new FormControl(null, Validators.minLength(3)),
    cpf: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email),
    senha: new FormControl(null, Validators.minLength(3))
  });

  constructor(private service: TecnicoService, private toast: ToastrService, private route: Router) {

  }

  ngOnInit(): void {
  }

  crate(): void {
    this.service.create(this.tecnico).subscribe(res => {
      this.toast.success("Usuario cadastrado com sucesso")
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
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil))
    } else {
      this.tecnico.perfis.push(perfil)
    }
  }

  validarCampos(): boolean {
    return this.form.controls['email'].valid &&
      this.form.controls['senha'].valid &&
      this.form.controls['cpf'].valid &&
      this.form.controls['nome'].valid
  }

}