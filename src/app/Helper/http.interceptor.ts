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
    var BranchId = this.helper.GetUserInfo()?.branch_id;
    var CompanyId = this.helper.GetUserInfo()?.company_id;
    if (token == undefined) token = "";
    if (BranchId == undefined) BranchId = "";
    if (CompanyId == undefined) CompanyId = "";
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
        BranchId: BranchId,
        CompanyId: CompanyId
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
