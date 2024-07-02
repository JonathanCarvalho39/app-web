import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado = {
    id: '',
    dataAbertura: '',
    dataFechamento: '',
    prioridade: [],
    status: [],
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  };

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCadatro: '',
  }

  tecnico: Tecnico = {
    nome: '',
    email: '',
    especialidade: '',
    anosExp: '',
    cpf: '',
    senha: '',
    perfis: [],
    dataCadatro: undefined
  }

  constructor(
    private serviceChamado: ChamadoService,
    private serviceCliente: ClienteService,
    private serviceTecnico: TecnicoService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findByid();

  }

  findByid() {
    this.serviceChamado.findById(this.chamado.id).subscribe(resp => {
      this.chamado = resp;
      this.buscarRecurso();
    });
  }

  buscarRecurso() {
    this.serviceCliente.findById(this.chamado.cliente).subscribe(resp => {
      this.cliente = resp
    }, ex => {
      console.log(ex);
    })
    this.serviceTecnico.findById(this.chamado.tecnico).subscribe(resp => {
      this.tecnico = resp
    }, ex => {
      console.log(ex);
    })
  }

  colorStatus(status: any): string {
    if (status == 'ABERTO') {
      return 'green'
    } else if (status == 'ANDAMENTO') {
      return 'green'
    } else if (status == 'ENCERRADO') {
      return 'green'
    } else {
      return 'rgb(144, 144, 144)'
    }
  }

  convertDate(dataParam: any): string {
    if (dataParam == null || isNaN(Date.parse(dataParam))) {
      return 'N/D';
    }
    const data = new Date(dataParam);
    const formatter = new Intl.DateTimeFormat('pt-BR');
    return formatter.format(data);
  }
}
