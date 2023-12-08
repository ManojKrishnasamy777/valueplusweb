import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CommonHelper {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.ApiURL = environment.API_URL;
    this.StorageName = "IcTeam";
  }
  CurrentModule: string = "Invoicing";
  CurrentLeftmenu: string = "";
  ApiURL: string;
  StorageName: string;
  userInfoData: any;
  GetUserInfo(): any {
    if (!this.userInfoData) {
      let user = this.GetLocalStorage(this.StorageName, true);
      if (user == null) {
        return {};
      }
      else {
        return user;
      }
    }
    else {
      return this.userInfoData;
    }
  }

  SetLocalStorage(name: string, data: any, jsonformat: boolean = true) {
    if (name == this.StorageName) {
      this.userInfoData = null;
    }
    if (jsonformat) {
      window.localStorage.setItem(name, this.Encrypt(JSON.stringify(data)));
    }
    else {
      window.localStorage.setItem(name, this.Encrypt(data));
    }
  }

  GetLocalStorage(name: string, jsonformat: boolean = false) {
    if (jsonformat)
      return JSON.parse(this.Decrypt(window.localStorage.getItem(name)));
    else
      return this.Decrypt(window.localStorage.getItem(name));
  }

  DeleteAllLocalStorage() {
    if (document.getElementsByClassName("ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all").length > 0) {
      document.getElementsByClassName("ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all")[0].dispatchEvent(new Event("click"));
    }
    return window.localStorage.clear();
  }

  DeleteLocalStorage(name: string) {
    return window.localStorage.removeItem(name);
  }

  SucessToastr(message: string, title: string = "") {
    // this.toastrService.success(message, title, {
    //   closeButton: true,
    //   timeOut: 3000,
    // });
    this.messageService.add({ severity: 'success', summary: title, detail: message, life: 3000 });
  }

  ErrorToastr(message: string, title: string = "") {
    // this.toastrService.error(message, title, {
    //   closeButton: true,
    //   timeOut: 3000,
    // });
    this.messageService.add({ severity: 'error', summary: title, detail: message, life: 1000 });

  }
  WarningToastr(message: string, title: string = "") {
    // this.toastrService.error(message, title, {
    //   closeButton: true,
    //   timeOut: 3000,
    // });
    this.messageService.add({ severity: 'warn', summary: title, detail: message, life: 1000 });
  }

  ShowSpinner() {
    var x = document.getElementById("spinnerloading");
    var y = document.getElementById("spinnerloadingimage");
    x.style.display = "flex";
    y.style.display = "block";
  }

  HideSpinner() {
    var x = document.getElementById("spinnerloading");
    var y = document.getElementById("spinnerloadingimage");
    x.style.display = "none";
    y.style.display = "none";
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getFormValidationErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = formGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
    this.getFormValidationErrors(formGroup);
  }

  OutsideRirectionTo(uri: string, newpage: boolean = false) {
    if (newpage) {
      this.router.navigate([]).then(result => { window.open(uri, '_blank'); });
    }
    else {
      this.router.navigate([]).then(result => { window.open(uri, "_self"); });
    }
  }

  redirectTo(uri: string, newpage: boolean = false) {
    if (newpage) {
      this.router.navigate([]).then(result => { window.open(uri, '_blank'); });
    }
    else {
      this.router.navigateByUrl(uri);
    }
  }

  WithoutHistoryredirectTo(uri: string) {
    this.router.navigateByUrl(uri, { replaceUrl: true });
  }

  RefreshredirectTo(uri: string) {
    this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.router.navigateByUrl(uri));
  }

  Encrypt(text: string) {
    if (text == null)
      return text;
    var OriginalKey = CryptoJS.AES.encrypt(String(text), environment.API_URL).toString();
    var DuplicateKey = CryptoJS.enc.Base64.parse(OriginalKey);
    return DuplicateKey.toString(CryptoJS.enc.Hex);
  }

  EncryptWithSecrectKey(text: string) {
    if (text == null)
      return text;
    var OriginalKey = CryptoJS.AES.encrypt(String(text), environment.API_URL).toString();
    var DuplicateKey = CryptoJS.enc.Base64.parse(OriginalKey);
    return DuplicateKey.toString(CryptoJS.enc.Hex);
  }

  DecryptWithSecrectKey(text: string) {
    if (text == null)
      return text;
    var DuplicateKey = CryptoJS.enc.Hex.parse(text);
    var OriginalKey = DuplicateKey.toString(CryptoJS.enc.Base64);
    return CryptoJS.AES.decrypt(OriginalKey, environment.API_URL).toString(CryptoJS.enc.Utf8);
  }

  Decrypt(text: string) {
    if (text == null)
      return text;
    var DuplicateKey = CryptoJS.enc.Hex.parse(text);
    var OriginalKey = DuplicateKey.toString(CryptoJS.enc.Base64);
    return CryptoJS.AES.decrypt(OriginalKey, environment.API_URL).toString(CryptoJS.enc.Utf8);
  }

  EncryptWithURL(text: string, url: string) {
    if (text == null)
      return text;
    var OriginalKey = CryptoJS.AES.encrypt(String(text), url).toString();
    var DuplicateKey = CryptoJS.enc.Base64.parse(OriginalKey);
    return DuplicateKey.toString(CryptoJS.enc.Hex);
  }

  ConvertEnumToArray(data: any) {
    let ConvertArray = Object.keys(data).map((id) => {
      return {
        name: id.split('_').join(' '),
        id: data[id as keyof typeof data]
      };
    });
    return ConvertArray;
  }

  ConvertEnumToArrayWithName(data: any) {
    let ConvertArray = Object.keys(data).map((id) => {
      return {
        name: data[id as keyof typeof data],
        id: id
      };
    });
    return ConvertArray;
  }

  ConvertEnumToArrayOfPascal(data: any) {
    let ConvertArray = Object.keys(data).map((id) => {
      return {
        name: this.toPascalCaseSpace(id).split('_').join(' '),
        id: data[id as keyof typeof data]
      };
    });
    return ConvertArray;
  }

  CustomAddDate(start_date: Date, days: number) {
    let date: Date = new Date(start_date);
    return new Date(date.setDate(date.getDate() + days));
  }


  PDFDownload(file_name: string, base64_value: any) {
    const linkSource = "data:application/pdf;base64," + base64_value;
    const downloadLink = document.createElement("a");
    const fileName = file_name + ".pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  downloadAsBlob(response: any, fileName: any) {
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(response.body);
    link.download = fileName;
    link.click();
  }

  toPascalCaseSpace(string) {
    return `${string}`
      .replace(/([A-Z])/g, ' $1')
  }
}
