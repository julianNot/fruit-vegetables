import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { CommerceHomeComponent } from './pages/commerce-home/commerce-home.component';
import { CartProductsComponent } from './pages/cart-products/cart-products.component';
import { BillProductsComponent } from './pages/bill-products/bill-products.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: LoginComponent,
    data: { type: 'register' }
  },
  {
    path: 'home',
    component: CommerceHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bill',
    component: BillProductsComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class CommerceRoutingModule { }
