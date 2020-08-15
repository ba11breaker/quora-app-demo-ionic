import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  public notLogin: boolean = true;
  public isLogined: boolean = false;

  public modal;

  constructor(
    public modalCtrl: ModalController,
    public _utils: UtilsService,
  ) {

  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this._utils.getStorage('UserId').then(val => {
      if (val) {
        this.notLogin = false;
        this.isLogined = true;
      }
      else {
        this.notLogin = true;
        this.isLogined = false;
      }
    })
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

}
