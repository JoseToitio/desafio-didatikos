import { Component } from '@angular/core';
import { Product, ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  products: Product[] = [];
  constructor(private productService: ProductsService) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
