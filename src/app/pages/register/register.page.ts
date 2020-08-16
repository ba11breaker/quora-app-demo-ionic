import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { NavController } from '@ionic/angular';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public mobile: any;
  public nickname: any;
  public password: any;
  public confirmPassword: any;
  public errorMessage: any;

  constructor(
    public _utils: UtilsService,
    public _rest: RestService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.navCtrl.back();
  }

  toLogin() {
    this.dismiss();
  }

  async doRegister() {
    if(this.password !== this.confirmPassword) {
      await this._utils.showToast('Password are not confirmed');
      return;
    }
    await this._utils.showLoading('Registering...');
    this._rest.register(this.mobile, this.nickname, this.password)
      .subscribe(async res => {
        if(res["Status"] === 'OK') {
          await this._utils.showToast('Register Successfully!');
          this._utils.hideLoading();
          this.dismiss();
        } else {
          this._utils.hideLoading();
          await this._utils.showToast(res['StatusContent']);
        }
      }, error => {
        this.errorMessage = error;
        this._utils.hideLoading();
        console.error(this.errorMessage);
      });
    //this._utils.hideLoading();
  }
}
