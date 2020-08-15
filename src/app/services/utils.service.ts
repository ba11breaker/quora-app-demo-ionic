import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private loading;
  private toast;

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) { }

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
}
