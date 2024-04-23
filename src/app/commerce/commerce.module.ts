import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommerceRoutingModule } from './commerce.routing.module';

import { LoginComponent } from './pages/login/login.component';
import { CommerceHomeComponent } from './pages/commerce-home/commerce-home.component';
import { CartProductsComponent } from './pages/cart-products/cart-products.component';
import { BannerCommerceComponent } from './components/banner-commerce/banner-commerce.component';
import { CardEditComponent } from './components/card-edit/card-edit.component';
import { BillProductsComponent } from './pages/bill-products/bill-products.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';



@NgModule({
  declarations: [
    LoginComponent,
    CommerceHomeComponent,
    CartProductsComponent,
    BannerCommerceComponent,
    BillProductsComponent,
    AdminPanelComponent,
    CardEditComponent
  ],
  imports: [
    CommonModule,
    CommerceRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class CommerceModule { }
