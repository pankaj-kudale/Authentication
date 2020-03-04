import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ErrorInterceptor } from './helper/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { FakeBackEndInterceptor } from './helper/fake-backend.interceptor';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[ AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
