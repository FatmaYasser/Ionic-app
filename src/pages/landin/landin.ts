import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the LandinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-landin',
  templateUrl: 'landin.html',
})
export class LandinPage {
  data;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`,
      duration: 3000
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);


    this.storage.get('user').then((val) => {
      console.log(val);


      if (val) {
        // loading.dismiss();
        this.navCtrl.push(HomePage);
        this.navCtrl.setRoot(HomePage)

      }

      else {
        // loading.dismiss();
        this.navCtrl.push(LoginPage);
      }
    });
  }


}






