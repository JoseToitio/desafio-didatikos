import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  codProduto: number;
  nomeProduto: string;
  valorProduto: number;
  estoque: number;
  cidade: {
    id: number,
    nome: string
  };
}

export interface RequestProduct {
  codProduto: number;
  nomeProduto: string;
  valorProduto: number;
  estoque: number;
  cidadeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: RequestProduct): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers });
  }
}
