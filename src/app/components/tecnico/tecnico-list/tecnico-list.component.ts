import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pessoa } from 'src/app/models/pessoa'
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})

export class TecnicoListComponent implements OnInit {
  ELEMENT_DATA: Pessoa[] = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Pessoa>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private service: PessoaService
  ) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.service.findAll('tecnicos').subscribe(rep => {
      this.ELEMENT_DATA = rep
      this.dataSource = new MatTableDataSource<Pessoa>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
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


