import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommerceService } from '../../services/commerce.service';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  @Input() product: any;
  public products:Product[] = []
  public productsFirebase: any[] = []
  public productForm!: FormGroup;

  constructor(
    private commerceService: CommerceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.commerceService.getAllProducts().subscribe((res: any) => {
      this.productsFirebase = res;
      this.products = Object.values(res);

      console.log('Lista Productos', this.products);
      console.log('Lista Productos Fire base', this.productsFirebase);
    })

    this.productForm = this.createProductForm()
  }

  createProductForm(): FormGroup {
    return this.formBuilder.group({
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      price: [this.product.price, [Validators.required, Validators.min(0)]],
      quantity: [this.product.quantity, [Validators.required, Validators.min(0)]],
      category: [this.product.category, Validators.required]
    });
  }

  findFirebaseKey(productId: string): string {
    for (const key in this.productsFirebase) {
      if (this.productsFirebase.hasOwnProperty(key)) {
        if (this.productsFirebase[key].id === productId) {
          return key;
        }
      }
    }
    return '';
  }

  onUpdate(product: any) {
    const firebaseKey: any = this.findFirebaseKey(product.id);
    if (firebaseKey) {
      this.productsFirebase[firebaseKey] = product;

      this.commerceService.updateProduct(firebaseKey, this.productForm.value).subscribe(() => {
        console.log("Producto actualizado correctamente.");
      }, (error: any) => {
        console.error("Error al actualizar el producto:", error);
      });
    } else {
      console.error("No se encontró ninguna clave correspondiente al id del producto:", product.id);
    }
  }

  onDelete(product: any) {
    const firebaseKey: any = this.findFirebaseKey(product.id);
    if (firebaseKey) {
      this.commerceService.deleteProduct(firebaseKey).subscribe(() => {
        console.log("Producto eliminado correctamente.");
      }, (error: any) => {
        console.error("Error al eliminar el producto:", error);
      });
    } else {
      console.error("No se encontró ninguna clave correspondiente al id del producto:", product.id);
    }
  }

  loadProducts() {
    this.commerceService.getAllProducts().subscribe((res: any) => {
      this.productsFirebase = res;
      this.products = Object.values(res);
    });
  }
}
