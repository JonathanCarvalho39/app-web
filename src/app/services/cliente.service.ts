import { APP_ID, Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`)
  }

  findById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`)
  }

  create(pessoa: Cliente): Observable<Cliente[]> {
    return this.http.post<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`, pessoa);
  }

  update(pessoa: Cliente): Observable<Cliente[]> {
    return this.http.put<Cliente[]>(`${API_CONFIG.baseUrl}/clientes/${pessoa.id}`, pessoa)
  }

  delete(id: any) {
    return this.http.delete(`${API_CONFIG.baseUrl}/clientes/${id}`)
  }
}
