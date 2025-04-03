import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ILogin {
  cpf: string;
  password: string;
}

export interface IRegister {
  name: string;
  cpf: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  register(user: IRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  login(user: ILogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user)
  }
}
