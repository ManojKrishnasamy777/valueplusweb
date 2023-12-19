import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Geolocation, Position } from '@capacitor/geolocation';
import { registerPlugin } from '@capacitor/core';
import { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");
@Injectable({
  providedIn: 'root'
})
export class CommonHelperService {
  ApiURL: string;
  StorageName: string;
  // userInfo: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private router: Router,
    private platform: Platform,
  ) {
    this.ApiURL = environment.API_URL;
    this.StorageName = 'MKV';
  }

  async getUserInfo() {
    // if(this.userInfo) {
    //   return this.userInfo;
    // }
    const info = window.localStorage.getItem(this.StorageName);
    // debugger
    // this.userInfo = info ? JSON.parse(info) : null;
    // return this.userInfo;
    return info ? JSON.parse(info) : null;
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

  async getCurrentGeoLocation() {
    try {
      if (this.platform.is('android')) {
        const permissionStatus = await Geolocation.requestPermissions();
        const coordinates: Position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
        return { coords: { latitude: coordinates.coords.latitude, longitude: coordinates.coords.longitude } };
      }
      else {
        return new Promise((resolve, reject) => {
          BackgroundGeolocation.addWatcher(
            {
              requestPermissions: false,
              stale: true
            },
            (location: any) => {
              const data =  { coords: { latitude: location?.latitude, longitude: location?.longitude } };
              resolve(data)
            }
          ).then((id: any) => {
            setTimeout(() => {
              BackgroundGeolocation.removeWatcher({ id });
            }, 100);
          });
        });
      }
    }
    catch (err: any) {
      return (err as Error).message;
    }
    // const permissionStatus = await Geolocation.checkPermissions();
    // const permissionStatus = await Geolocation.requestPermissions();
    // const coordinates: Position = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
    // return coordinates;
  }
}
