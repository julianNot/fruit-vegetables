import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommerceRoutingModule } from './commerce.routing.module';

import { LoginComponent } from './pages/login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CommerceRoutingModule,
  ]
})
export class CommerceModule { }
