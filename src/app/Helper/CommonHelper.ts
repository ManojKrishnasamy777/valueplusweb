import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { environment } from '../../environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CommonHelper {
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) {
    this.ApiURL = environment.API_URL;
    this.StorageName = "CarHiring";
  }
  CurrentModule: string = "Invoicing";
  CurrentLeftmenu: string = "";
  ApiURL: string;
  StorageName: string;
  userInfoData: any;

  DeleteAllLocalStorage() {
    if (document.getElementsByClassName("ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all").length > 0) {
      document.getElementsByClassName("ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all")[0].dispatchEvent(new Event("click"));
    }
    return window.localStorage.clear();
  }

  DeleteLocalStorage(name: string) {
    return window.localStorage.removeItem(name);
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


  ConvertEnumToArray(data: any) {
    let ConvertArray = Object.keys(data).map((id) => {
      return {
        name: id.split('_').join(' '),
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

  GetCurentUser() {
    let User: any;
    const storedData = window.localStorage.getItem(this.StorageName);
    if (storedData) {
      const data = JSON.parse(storedData ? storedData : '{}');
      if (data != null) {
        User = data;
      }
      return User;
    }
    else {
      return null;
    }

  }

  GetLocalStorage(name: string, jsonformat: boolean = false) {
    if (jsonformat) {
      const storedData = window.localStorage.getItem(name);
      const data = JSON.parse(storedData ? storedData : '');
      return data;
    }
    else {
      return window.localStorage.getItem(name);
    }
  }


  async ShowSpinner() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    return loading;
  }
  HideSpinner(loading: HTMLIonLoadingElement) {
    loading.dismiss();
  }

  async SuccessToster(Message: string) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
  async ErrorToster(Message: string) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }





}
