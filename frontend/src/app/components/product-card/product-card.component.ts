import { Component, Input } from '@angular/core';
import { Product } from '../../services/products.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: Product;
}
