import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommerceService } from '../../services/commerce.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public products:Product[] = []
  public productsFirebase: any[] = []
  public productForm!: FormGroup;

  constructor(
    private commerceService: CommerceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.commerceService.getAllProducts().subscribe((res: any) => {
      // this.productsFirebase = res;
      // this.products = Object.values(res);

      // console.log('Lista Productos', this.products);
      // console.log('Lista Productos Fire base', this.productsFirebase);
      this.loadProducts()
    })

    // this.productForm = this.createProductForm()
  }

  loadProducts() {
    this.commerceService.getAllProducts().subscribe((res: any) => {
      this.productsFirebase = res;
      this.products = Object.values(res).map((product: any) => {
        if (product.id) {
          return product;
        } else {
          // Si es un objeto, lo convierte a un array para mantener la estructura consistente
          return product[Object.keys(product)[0]];
        }
      });

      console.log('Lista Productos', this.products);
      console.log('Lista Productos Fire base', this.productsFirebase);
    });
  }
}
