import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente'
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  ELEMENT_DATA: Cliente[] = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private service: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.service.findAll().subscribe(rep => {
      this.ELEMENT_DATA = rep
      this.dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  delete(id: any, nome: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Você realmente deseja deletar o cliente ${nome}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then(resp => {
      if (resp.isConfirmed) {
        this.service.delete(id).subscribe(resp => {
          Swal.fire({
            title: 'Confirmação',
            text: 'Cliente deletado com Sucesso!',
            icon: 'success',
            showCancelButton: true
          }).then(resp => {
            if (resp.isConfirmed) {
              this.findAll()
            }
          })
        }, ex => {
          Swal.fire('Cancelado', ex.error.message, 'error')
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatarCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}
