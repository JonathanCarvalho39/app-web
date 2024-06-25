import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credecial } from '../models/credenciais';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    jwtService: JwtHelperService = new JwtHelperService();
  
    constructor(private http: HttpClient) { }
  
    autenticar(creds: Credecial) {
      return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
        observe: 'response',
        responseType: 'text'
      });
    }
  
    successsfullLogin(authToken: string) {
      localStorage.setItem('token', authToken);
    }
  
    isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      if (token != null) {
        const isTokenValid = !this.jwtService.isTokenExpired(token);
        return isTokenValid;
      }
      return false;
    }  

}
