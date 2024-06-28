import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {
  ELEMENT_DATA: Chamado[] = []

  displayedColumns: string[] = [
    'id',
    'titulo',
    'observacoes',
    'nomeCliente',
    'nomeTecnico',
    'dataAbertura',
    'prioridade',
    'status',
    'acoes'
  ];

  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ChamadoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.service.findAll().subscribe(rep => {
      this.ELEMENT_DATA = rep
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: any, titulo: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Você realmente deseja deletar o chamdo com o titulo: ${titulo}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          debugger
          Swal.fire({
            title: 'Confirmado!',
            text: 'Chamado deletado com sucesso.',
            icon: 'success',
            showConfirmButton: true,
          }).then((resp) => {
            if (resp.isConfirmed) {
              this.findAll()
            }
          });
        }, ex => {
          Swal.fire('Cancelado', ex.error.message, 'error');
        })
      }
    });
  }
  abirObservacoes(observacoes: string) {
    Swal.fire({
      title: 'Observação',
      text: observacoes,
      icon: 'info',
      cancelButtonText: 'Ok'
    })
  }

  infStatus(status: any): string {
    if (status == 0) {
      return 'ABERTO'
    } else if (status == 1) {
      return 'ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  infprioridade(prioridade: any): string {
    if (prioridade == 0) {
      return 'BAIXA'
    } else if (prioridade == 1) {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }
}