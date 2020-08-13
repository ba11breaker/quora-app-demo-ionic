import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
  ) {

  }

  ngOnInit() {
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
    });
    return await modal.present();
  }

}
