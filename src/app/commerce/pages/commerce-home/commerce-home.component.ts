import { Component, OnInit } from '@angular/core';
import { Product, Category } from '../../interfaces/product';
import { CommerceService } from '../../services/commerce.service';
import { KeyValuePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commerce-home',
  templateUrl: './commerce-home.component.html',
  styleUrls: ['./commerce-home.component.css']
})
export class CommerceHomeComponent implements OnInit {
  public products:Product[] = []
  public cartItems:Product[] = []

  constructor(
    private commerceService: CommerceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.commerceService.getAllProducts().subscribe(res => {
      this.products = Object.values(res);
    })
  }

  addToCart(product: Product) {
    if(product.quantity > 0) {
      const index = this.cartItems.findIndex(item => item.id === product.id);
      console.log('Exist', index);
      if(index != -1) {
        console.log('ELE', this.cartItems[index]);
        this.cartItems[index].quantity += 1;
        product.quantity -= 1
      }else {
        this.cartItems.push({...product, quantity: 1})
        product.quantity -= 1
      }
    }
    console.log('ITEMS', this.cartItems);
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  logOut() {
    sessionStorage.setItem('token', '')
    this.router.navigate(['commerce/login']);
  }

  getCartLength() {
    const cart = sessionStorage.getItem('cartItems')
    if(cart) {
      return JSON.parse(cart).length
    }
    return 0
  }
}
