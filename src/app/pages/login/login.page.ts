import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { UtilsService } from '../../services/utils.service';
import { RestService } from '../../services/rest.service';

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
    public _rest: RestService,
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dissmissed': true,
    });
  }

  async login() {
    const loading = await this._utils.showLoading();
    loading.present();
    this._rest.login(this.mobile, this.password)
      .subscribe(async function(res) {
        if(res['Status']==='OK') {

        } else {
          const toast = await this._utils.showToast('Can\'t Login!');
        }
      });
    await this._utils.hideLoading(loading);
  }

}
