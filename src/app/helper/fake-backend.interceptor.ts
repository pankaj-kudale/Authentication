import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';

const users: User[] = [{ id: 1, username: 'test', password: 'test', firstName: 'test', lastName: 'User' }];

@Injectable()
export class FakeBackEndInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(delay(500));
      //.pipe(dematerialize());
    
      function handleRoute(){
        switch (true) {
          case req.url.endsWith('/users/authenticate') && req.method === 'POST':
              return authenticate()
            break;

            case req.url.endsWith('/users') && req.method === 'GET':
              return getUsers()
            break;
        
          default:
            return next.handle(req);
        }
      }

      function authenticate() {
        const { userName, password } = req.body;
        const user = users.find(x => x.username === userName && x.password === password);
        if (!user) return error('Username or password is incorrect');
        return ok({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
        })
    }

    function getUsers() {
        if (!isLoggedIn()) return unauthorized();
        return ok(users);
    }

    // helper functions

    function ok(body?) {
        return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
        return throwError({ error: { message } });
    }

    function unauthorized() {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
        return req.headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}