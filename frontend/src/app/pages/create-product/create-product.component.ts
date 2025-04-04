import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { City, CityService } from '../../services/city.service';
import { Product, ProductsService, RequestProduct } from '../../services/products.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-product',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit{
  productForm!: FormGroup;
  cities: City[] = [];
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private cityService: CityService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.productForm = this.fb.group({
      nomeProduto: ['', Validators.required],
      valorProduto: ['', [Validators.required, Validators.min(0)]],
      estoque: ['', [Validators.required, Validators.min(0)]],
      cidade: ['', Validators.required],
    });

    this.loadCities();
  }

  loadCities() {
    this.cityService.getCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  createProduct() {
    if (this.productForm.invalid) return;

    const newProduct: RequestProduct = {
      nomeProduto: this.productForm.value.nomeProduto,
      valorProduto: this.productForm.value.valorProduto,
      estoque: this.productForm.value.estoque,
      cidadeId: this.productForm.value.cidade,
    };

    this.productService.createProduct(newProduct).subscribe(() => {
      alert('Produto criado com sucesso!');
      this.router.navigate(['/products']);
    });
  }

}
