import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})

export class TecnicoService {
  constructor(private http: HttpClient) { }

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`)
  }

  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`)
  }

  create(tecnico: Tecnico): Observable<Tecnico[]> {
    return this.http.post<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`, tecnico);
  }

  update(tecnico: Tecnico): Observable<Tecnico[]> {
    return this.http.put<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos/${tecnico.id}`, tecnico)
  }

  delete(id: any) {
    return this.http.delete(`${API_CONFIG.baseUrl}/tecnicos/${id}`)
  }
}
