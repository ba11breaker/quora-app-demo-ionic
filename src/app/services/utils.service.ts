import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private loading;
  private toast;

  constructor(
    public _platform: Platform,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public _storage: Storage,
  ) { }

  checkPlatform(platform) {
    return this._platform.is(platform);
  }

  async showLoading(message = 'Loading...', duration = 60000) {
    const loading = await this.loadingCtrl.create({
      message: message,
      duration: duration,
    });
    this.loading = loading;
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  async showToast(message, duration=3000) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom',
    });
    this.toast = toast;
    this.toast.present();
  }

  hideToast() {
    this.toast.dismiss();
  }

  setStorage(key: any, value: any) {
    try{
      this._storage.set(key, value);
    } catch(err) {
      console.error(err);
    }
  }

  getStorage(key: any) {
    try{
      return this._storage.get(key);
    } catch(err) {
      console.error(err);
    }
  }

  removeStorage(key: any) {
    this._storage.remove(key);
  }
}
