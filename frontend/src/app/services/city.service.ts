import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface City {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:8080/cidades';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getCities(): Observable<City[]> {
    const headers = this.authService.getToken();
    return this.http.get<City[]>(this.apiUrl, {headers})
  }
}
