import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    public _utils: UtilsService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.navCtrl.back();
  }
}
