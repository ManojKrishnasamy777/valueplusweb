/* eslint-disable eqeqeq */
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonHelper } from './CommonHelper';
import { CommonHelperService } from './common-helper.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(
    private helper: CommonHelperService,
    private helpers: CommonHelper,
    private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = this.helper.GetUserInfo()?.api_token;
    if (token == undefined) token = "";
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      }
    });
    return next.handle(request).pipe(
      tap(
        async event => {
          if (event instanceof HttpResponse) {
            const body = event.body;
            if (body?.Type == 'UA') {
              const spinner = await this.helpers.ShowSpinner();
              this.helpers.ErrorToster('Token expired please login again to continue');
              this.helpers.DeleteAllLocalStorage();
              this.router.navigate(['login']);
              this.helpers.HideSpinner(spinner);
            }
          }
        },
        error => {

        }
      )
    );
  }
}
