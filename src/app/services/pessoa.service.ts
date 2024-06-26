import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  findAll(tipoPessoa: string): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${API_CONFIG.baseUrl}/${tipoPessoa}`)
  }
}
