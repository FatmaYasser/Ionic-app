import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  list = [];


  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public storage: Storage) {


  }
  getItem() {
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

    this.storage.get('item').then((val) => {
      this.list = Array.isArray(val) ? val : [];


    });

    // loading.dismiss();
  }


}
