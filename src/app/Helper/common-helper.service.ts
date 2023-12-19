import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CommonHelperService {
  DeleteAllLocalStorage() {
    throw new Error('Method not implemented.');
  }
  redirectTo(arg0: string) {
    throw new Error('Method not implemented.');
  }
  ApiURL: string;
  StorageName: string;
  userInfoData: any;
  // userInfo: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private router: Router,
  ) {
    this.ApiURL = environment.API_URL;
    this.StorageName = 'BJP';
  }

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

  async showSpinner() {
    const loading: HTMLIonLoadingElement = await this.loadingCtrl.create();
    await loading.present();
    return loading;
  }

  async presentErrorToast(msg: string = '', position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: position,
      icon: "alert-circle-outline",
      color: 'danger'
    });
    await toast.present();
  }
  async presentSuccessToast(msg: string = '', position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: position,
      icon: "checkmark-done-outline",
      color: 'success'
    });
    await toast.present();
  }

  logout() {
    window.localStorage.clear();
    // this.userInfo = null;
    this.router.navigate(['']);
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

  Encrypt(text: string) {
    if (text == null)
      return text;
    var OriginalKey = CryptoJS.AES.encrypt(String(text), environment.API_URL).toString();
    var DuplicateKey = CryptoJS.enc.Base64.parse(OriginalKey);
    return DuplicateKey.toString(CryptoJS.enc.Hex);
  }

  GetLocalStorage(name: string, jsonformat: boolean = false) {
    if (jsonformat)
      return JSON.parse(this.Decrypt(window.localStorage.getItem(name)));
    else
      return this.Decrypt(window.localStorage.getItem(name));
  }

  Decrypt(text: any) {
    if (text == null)
      return text;
    var DuplicateKey = CryptoJS.enc.Hex.parse(text);
    var OriginalKey = DuplicateKey.toString(CryptoJS.enc.Base64);
    return CryptoJS.AES.decrypt(OriginalKey, environment.API_URL).toString(CryptoJS.enc.Utf8);
  }

}
