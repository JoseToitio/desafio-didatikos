import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './pages/register/register.component';
import { ProductComponent } from './pages/product/product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'create-product', component: CreateProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
