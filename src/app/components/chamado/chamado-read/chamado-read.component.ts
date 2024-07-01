import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

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
    cliente: ''
  };

  colorAberto: any
  colorAndamento: any
  colorEncerrado: any

  constructor(
    private serviceChamado: ChamadoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findByid();
  }

  findByid() {
    this.serviceChamado.findById(this.chamado.id).subscribe(resp => {
      this.chamado = resp;
    });
  }

  colorStatus(status: any): string {
    if (status == 'ABERTO') {
      return 'green'
    } else if (status == 'ANDAMENTO') {
      return 'green'
    } else if (status == 'ENCERRADO') {
      return 'green'
    }else{
      return 'rgb(144, 144, 144)'
    }
  }

  convertDate(dataParam: any) {
    if (dataParam == null) {
      return 'N/D'
    }
    let data = new Date(dataParam);
    let formatter = new Intl.DateTimeFormat('pt-BR');
    return formatter.format(data);
  }


}
