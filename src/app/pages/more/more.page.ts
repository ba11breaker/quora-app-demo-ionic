import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { UtilsService } from '../../services/utils.service';
import { RestService } from '../../services/rest.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  public UserId: string;

  public notLogin: boolean = true;
  public isLogined: boolean = false;

  public modal;

  public avatarImg: string = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
  public userInfo: any = '';

  constructor(
    public modalCtrl: ModalController,
    public navCtrl : NavController,
    public _utils: UtilsService,
    public _rest: RestService,
  ) {

  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this._utils.getStorage('UserId').then(async val => {
      if (val) {
        this.UserId = val;
        await this._utils.showLoading('Loading...');
        this._rest.getUserInfo(val)
          .subscribe(res => {
            if(res['Status'] = 'OK') {
              this.userInfo = {
                nickName: res['UserNickName'],
              };
              this.avatarImg = res['UserHeadface'];
              this._utils.hideLoading();
            } else {
              this._utils.hideLoading();
              this._utils.showToast('Error in getting User information!');
            }
          }, err => {
            console.error(err);
          });
        this.notLogin = false;
        this.isLogined = true;
      } else {
        this.notLogin = true;
        this.isLogined = false;
        this.loadUserPage();
      }
    });
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
    });
    this.modal = modal;
    await this.modal.present();
    const { data } = await this.modal.onWillDismiss();
    const { res } = data;
    console.log(res);
    if(res === 'success') {
      this.notLogin = false;
      this.isLogined = true;
    }
  }

  toUserPage() {
    this.navCtrl.navigateForward(['user'], {
      queryParams: {
        id: this.UserId,
        name: this.userInfo['nickName'],
        img: this.avatarImg,
      }
    });
  }
}
