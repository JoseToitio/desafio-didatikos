import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface ILogin {
  cpf: string;
  password: string;
}

export type User = {
  cpf: string;
  id: number;
  name: string;
  role: string;
}

export interface IRegister {
  name: string;
  cpf: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users';
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  register(user: IRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  login(user: ILogin): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.getUserInfo().subscribe();
      })
    );
  }

  getUserInfo(): Observable<User> {
    const token = localStorage.getItem('token');
    if (!token) return new Observable(observer => observer.error('Token não encontrado'));

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/me`, { headers }).pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  getUserObservable(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }
}
