import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Product {
  codProduto?: number;
  nomeProduto: string;
  valorProduto: number;
  estoque: number;
  cidade: {
    id: number,
    nome: string
  };
}

export interface RequestProduct {
  codProduto?: number;
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

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: RequestProduct): Observable<Product> {
    const headers = this.authService.getToken();
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers });
  }

  createProduct(product: RequestProduct): Observable<Product> {
    const headers = this.authService.getToken();
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  removeProduct(id: number): Observable<any> {
    const headers = this.authService.getToken();
    return this.http.delete(`${this.apiUrl}/${id}`, {headers});
  }
}
