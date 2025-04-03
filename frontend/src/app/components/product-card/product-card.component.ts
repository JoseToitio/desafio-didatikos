import { Component, Input } from '@angular/core';
import { Product } from '../../services/products.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule, RouterLink],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: Product;
}
