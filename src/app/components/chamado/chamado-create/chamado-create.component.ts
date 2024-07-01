import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  check: any

  chamado: Chamado = {
    id: '',
    dataAbertura: '',
    dataFechamento: '',
    prioridade: [],
    status: [],
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: ''
  };

  ELEMENT_CLIENTE: Cliente[] = []
  ELEMENTE_TECNICO: Tecnico[] = []

  form = new FormGroup({
    titulo: new FormControl(null, Validators.minLength(3) && Validators.maxLength(30)),
    observacoes: new FormControl(null, Validators.minLength(3)),
    cliente: new FormControl(null, Validators.minLength(3)),
    tecnico: new FormControl(null, Validators.minLength(3)),
    prioridade: new FormControl(null, Validators.required)
  });

  dataSurceCliente = new MatTableDataSource<Cliente>(this.ELEMENT_CLIENTE)
  dataSurceTecnico = new MatTableDataSource<Cliente>(this.ELEMENTE_TECNICO)

  constructor(
    private service: ChamadoService,
    private serviceCliente: ClienteService,
    private serviceTecnico: TecnicoService,
    private toast: ToastrService,
    private route: Router) {

  }

  ngOnInit(): void {
    this.buscaRecurso()
  }

  buscaRecurso() {
    this.serviceCliente.findAll().subscribe(resp => {
      this.ELEMENT_CLIENTE = resp
      this.dataSurceCliente = new MatTableDataSource<Cliente>(resp)
    }, ex => {
      console.log(ex);
    })

    this.serviceTecnico.findAll().subscribe(resp => {
      this.ELEMENTE_TECNICO = resp
      this.dataSurceTecnico = new MatTableDataSource<Cliente>(resp)
    }, ex => {
      console.log(ex);
    })
  }

  crate(): void {
    console.log(this.chamado);
    
    this.chamado.prioridade.push(this.check)
    this.chamado.status.push(0)
    this.service.create(this.chamado).subscribe(() => {
      this.toast.success("Chamado cadastrado com sucesso")
      this.route.navigate(['/chamado'])
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
  validarCampos(): boolean {
    return this.form.valid
  }

}
