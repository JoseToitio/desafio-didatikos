import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Product,
  ProductsService,
  RequestProduct,
} from '../../services/products.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { City, CityService } from '../../services/city.service';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  cities: City[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private cityService: CityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCities();
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.productForm = this.fb.group({
        nomeProduto: [product.nomeProduto, Validators.required],
        valorProduto: [
          product.valorProduto,
          [Validators.required, Validators.min(0)],
        ],
        estoque: [product.estoque, [Validators.required, Validators.min(0)]],
        cidade: [product.cidade.id, Validators.required],
      });
    });
  }

  loadCities() {
    this.cityService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }
  updateProduct() {
    if (this.productForm.invalid) return;

    const updatedProduct: RequestProduct = {
      codProduto: this.productId,
      nomeProduto: this.productForm.value.nomeProduto,
      valorProduto: this.productForm.value.valorProduto,
      estoque: this.productForm.value.estoque,
      cidadeId: this.productForm.value.cidade,
    };

    this.productService
      .updateProduct(this.productId, updatedProduct)
      .subscribe(() => {
        alert('Produto atualizado com sucesso!');
        this.router.navigate(['/products']);
      });
  }

  removeProduct() {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      this.productService.removeProduct(this.productId).subscribe(() => {
        alert('Produto removido com sucesso!');
        this.router.navigate(['/products']);
      });
    }
  }
}
