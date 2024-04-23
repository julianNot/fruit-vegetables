import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'commerce',
    loadChildren: () => import('./commerce/commerce.module').then(m => m.CommerceModule)
  },
  {
    path: '**',
    redirectTo: 'commerce/home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
