import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico'
import { TecnicoService } from 'src/app/services/tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})

export class TecnicoListComponent implements OnInit {
  ELEMENT_DATA: Tecnico[] = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private service: TecnicoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.service.findAll().subscribe(rep => {
      this.ELEMENT_DATA = rep
      this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: any, nome:string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Você realmente deseja deletar o técnico ${nome}?`,
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
            text: 'Técnico deletado com sucesso.',
            icon: 'success',
            showConfirmButton: true,
          }).then((resp) => {
            if (resp.isConfirmed) {
              location.reload()
            }
          });
        }, ex => {
          Swal.fire('Cancelado', ex.error.message, 'error');
        })
      }
    });
  }

  formatarCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}


