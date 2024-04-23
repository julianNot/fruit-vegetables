import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent implements OnInit{
  public cartItems: Product[] = []
  public itemsCart: any


  ngOnInit(): void {
    const cart = sessionStorage.getItem('cartItems')
    if(cart) {
      this.cartItems = JSON.parse(cart)
      this.calculateItemsCart();
    }
    console.log('CARRITO', this.cartItems);
  }

  calculateItemsCart(): void {
    this.itemsCart = this.cartItems.map(product => {
      const totalPrice = product.price * product.quantity;
      return {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        image: product.image,
        price: product.price,
        totalPrice: totalPrice
      };
    });
  }

  updatePrice(product: any, event: any): void {
    const target = event.target;
    if(target.value > 0){
      product.totalPrice = product.price * target.value
    }else {
      this.cartItems = this.itemsCart.filter((item: any) => item !== product);
      sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  getTotal() {
    let total = 0;
    this.itemsCart.forEach((product: { totalPrice: number; }) => {
      total += product.totalPrice;
    });
    return total;
  }
}
