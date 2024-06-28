import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
@Component({
  selector: 'app-update-cliente',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class UpdateClienteComponent implements OnInit {
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

  constructor(private service: ClienteService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  }

  findById() {
    this.service.findById(this.cliente.id).subscribe(resp => {
      
      this.cliente = resp;
      this.cliente.perfis.splice(this.cliente.perfis.indexOf('CLIENTE'), 1)
      this.cliente.perfis.push(1)

      this.cliente.perfis.forEach(element => {

        if (element == 'ADMIN') {
          this.form.patchValue({ admin: true });
          this.cliente.perfis.splice(0, 1)
          this.cliente.perfis.push(0)
        }

      })
    });
  }

  update(): void {
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success("Cliente atualizado com sucesso")
      this.router.navigate(['/cliente'])
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
    return this.form.controls['email'].valid &&
      this.form.controls['senha'].valid &&
      this.form.controls['cpf'].valid &&
      this.form.controls['nome'].valid
  }

}
