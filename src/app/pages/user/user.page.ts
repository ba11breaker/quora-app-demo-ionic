import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { NavController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public userInfo = {
    id: '',
    name: '',
    img: '',
  };

  constructor(
    public _utils: UtilsService,
    public _rest: RestService,
    public _actRoute: ActivatedRoute,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this._actRoute.queryParams.subscribe(params => {
      this.userInfo = {
        name: params['name'],
        id: params['id'],
        img: params['img'],
      };
    });
  }

  dismiss() {
    this.navCtrl.back();
  }

  updateProfile() {
    this._utils.showLoading();
    this._rest.updateNickName(this.userInfo['id'], this.userInfo['name'])
      .subscribe(res =>  {
        if(res['Status'] === 'OK') {
          this._utils.hideLoading();
          this._utils.showToast('Nickname updated successfully!');
        } else {
          this._utils.hideLoading();
          this._utils.showToast(res['StatusContent']);
        }
      })
  }

  async logout() {
    await this._utils.showLoading();
    this._utils.removeStorage('UserId');
    this.navCtrl.navigateForward(['tabs/home']);
    this._utils.hideLoading();
  }
}
