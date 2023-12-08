import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonHelper } from "./CommonHelper";
import { parseISO } from 'date-fns';
import { DateFormat } from "./DateFormat";

@Injectable()
export class AlphaInterceptor implements HttpInterceptor {
  // isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?$/;
  private _isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/;
  private _DateFormat = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  constructor(private helper: CommonHelper) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = this.helper.GetUserInfo()?.api_token;
    if (token == undefined) token = "";
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (request.method == "POST") {
      this.handleDates(request.body);
    }
    return next.handle(request).pipe(map((val: HttpEvent<any>) => {
      if (val instanceof HttpResponse) {
        let Responsebody = val.body;
        this.handleDates(Responsebody, false);
        return val;
      }
      // else {
      //   this.helper.HideSpinner();
      // }
    }));

  }

  isIsoDateString(value: any): boolean {
    return value && (typeof value === "string" && (this._isoDateFormat.test(value) || this._DateFormat.test(value))) || Object.prototype.toString.call(value) === '[object Date]';
  }

  handleDates(body: any, is_post: boolean = true) {
    if (body === null || body === undefined || typeof body !== "object") {
      return body;
    }
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (this.isIsoDateString(value)) {
        if (is_post) {
          body[key] = DateFormat.FormatDateTimeForAPI(new Date(value));
        }
        else {
          body[key] = new Date(value);
        }
      }
      else if (key.includes("is_")) {
        if (value == 0) {
          body[key] = false;
        }
        if (value == 1) {
          body[key] = true;
        }
      }
      else if (typeof value === "object") {
        this.handleDates(value);
      }
    }
  }


}