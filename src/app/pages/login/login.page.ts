import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public mobile: any;
  public password: any;

  constructor(
    public platform: Platform,
    public modalCtrl: ModalController,
    public _utils: UtilsService,
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dissmissed': true,
    });
  }

  async login() {
    console.log('login!');
    const loading = await this._utils.showLoading();
    loading.present();
    await this._utils.hideLoading(loading);
  }

}
