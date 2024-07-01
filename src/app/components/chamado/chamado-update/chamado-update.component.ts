import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Use OnPush strategy
})
export class ChamadoUpdateComponent implements OnInit {
  check: any;

  chamado: Chamado = {
    id: '',
    prioridade: [],
    status: [],
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  };

  ELEMENT_CLIENTE: Cliente[] = [];
  ELEMENTE_TECNICO: Tecnico[] = [];

  form = new FormGroup({
    titulo: new FormControl(null, [Validators.minLength(3), Validators.maxLength(30)]),
    observacoes: new FormControl(null, Validators.minLength(3)),
    cliente: new FormControl(null, Validators.minLength(3)),
    tecnico: new FormControl(null, Validators.minLength(3)),
    check: new FormControl(0, Validators.required) // Adicionado aqui
  });

  dataSourceCliente = new MatTableDataSource<Cliente>(this.ELEMENT_CLIENTE);
  dataSourceTecnico = new MatTableDataSource<Tecnico>(this.ELEMENTE_TECNICO);

  constructor(
    private service: ChamadoService,
    private serviceCliente: ClienteService,
    private serviceTecnico: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscaRecurso();
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();

  }

  findById() {
    this.service.findById(this.chamado.id).subscribe(
      (resp) => {
        this.chamado = resp;


      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  alterarCheck(id: number): void {
    this.form.get('check')?.setValue(id); // Atualiza o valor do form control
  }

  buscaRecurso() {
    this.serviceCliente.findAll().subscribe(
      (resp) => {
        this.ELEMENT_CLIENTE = resp;
        this.dataSourceCliente = new MatTableDataSource<Cliente>(resp);
      },
      (ex) => {
        console.log(ex);
      }
    );

    this.serviceTecnico.findAll().subscribe(
      (resp) => {
        this.ELEMENTE_TECNICO = resp;
        this.dataSourceTecnico = new MatTableDataSource<Tecnico>(resp);
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  update(): void {
    debugger;
    let status = this.chamado.status.length - 1;
    this.chamado.prioridade = [];
    this.chamado.status = [];
    this.chamado.prioridade.push(this.form.get('check')?.value);
    this.chamado.status.push(status);

    console.log(this.chamado);

    /* this.service.create(this.chamado).subscribe(() => {
      this.toast.success("Chamado cadastrado com sucesso")
      this.router.navigate(['/chamado'])
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message)
        });
      } else {
        this.toast.error(ex.error.message)
      }
    }) */
  }

  validarCampos(): boolean {
    return this.form.valid;
  }
}
