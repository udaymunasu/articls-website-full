import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'forget',
    component: ForgetPasswordComponent,
  },
  // {
  //   path: 'books/:id',
  //   component: BookDetailComponent,
  //   data: { title: 'Book Details' },
  // },
  // {
  //   path: 'book-create',
  //   component: BookCreateComponent,
  //   data: { title: 'Create Book' },
  // },
  // {
  //   path: 'books',
  //   component: BookComponent,
  //   data: { title: 'Book' },
  // },
  // {
  //   path: 'edit-book/:id',
  //   component: BookEditComponent,
  //   data: { title: 'Edit Book' },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
