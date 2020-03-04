import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedInUser = this.authenticationService.LoggedInUser;
    
    if(loggedInUser !== null && loggedInUser.token){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedInUser.token}`
        }
      })
    }
    return next.handle(req);
  }
}