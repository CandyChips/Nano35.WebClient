import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from "../services/token.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private identityService: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentToken = this.identityService.currentTokenSubject.value;
    if (currentToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + currentToken
        }
      });
    }

    return next.handle(request);
  }
}
