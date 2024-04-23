import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-bill-products',
  templateUrl: './bill-products.component.html',
  styleUrls: ['./bill-products.component.css']
})
export class BillProductsComponent {
  public cartItems: any[] = [];

  ngOnInit(): void {
    const cart = sessionStorage.getItem('cartItems');
    if (cart) {
      this.cartItems = JSON.parse(cart);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }
}
