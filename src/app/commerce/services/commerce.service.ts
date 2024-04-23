import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/product';
import { environment } from '.././../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {
  private apiUrlRegister: string = environment.apiUrlRegister;

  constructor(private http: HttpClient) { }

  registerNewUser(payload: any) {
    const url = `${this.apiUrlRegister}`;
    return this.http.post(url, payload)
  }

  updateProduct(idProduct: string, data: any) {
    return this.http.patch(`https://ecommerce-angular-31198-default-rtdb.firebaseio.com/products/${idProduct}.json`, data)
  }

  deleteProduct(idProduct: string) {
    return this.http.delete(`https://ecommerce-angular-31198-default-rtdb.firebaseio.com/products/${idProduct}.json`)
  }

  getAllProducts() {
    return this.http.get('https://ecommerce-angular-31198-default-rtdb.firebaseio.com/products.json')
  }
}
