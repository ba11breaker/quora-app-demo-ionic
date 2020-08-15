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
  public errorMessage: any;

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
    await this._utils.showLoading();
    this._rest.login(this.mobile, this.password)
      .subscribe(async res => {
        if(res['Status']==='OK') {
          this._utils.setStorage('UserId', res['UserId']);
          this._utils.hideLoading();
          this.dismiss();
        } else {
          this._utils.hideLoading();
          await this._utils.showToast(res['StatusContent']);
        }
      }, async err => {
        console.error(err);
        this.errorMessage = err;
        this._utils.hideLoading();
      });
  }

}
