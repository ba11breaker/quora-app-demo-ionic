import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public loadingCtrl: LoadingController,
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
}
