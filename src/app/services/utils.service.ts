import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) { }

  async showLoading(message = 'Loading...', duration = 60000) {
    const loading = await this.loadingCtrl.create({
      message: message,
      duration: duration,
    });
    return loading;
  }

  async hideLoading(loading: any) {
    const { role, data } = await loading.dismiss();
  }

  async showToast(message, duration=5000) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom',
    });
    return toast;
  }
}
