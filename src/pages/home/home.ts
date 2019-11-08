import { Component, Output } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ListPage } from '../list/list';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @Output('item') item: FormGroup;
  path: any;
  list = [];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public menuCtrl: MenuController, private toastCtrl: ToastController, private camera: Camera, private formBuilder: FormBuilder, public storage: Storage) {

    this.item = this.formBuilder.group({

      title: ['', Validators.required],
      description: ['', Validators.required],
      img: ['', Validators.required]


    });
  }

  openCam() {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      // this.path = base64Image
      this.item.patchValue({
        img: base64Image
      })

      this.path = this.item.get('img').value
    }, (err) => {

    });
  }


  postForm() {
    console.log(this.item.value);
    console.log(this.item.get('title').value);


    //toast if empty data
    if (this.item.invalid) {
      let toast = this.toastCtrl.create({
        message: 'opps! Empty Item .',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    } else {
      //get and push data if not reapeted
      this.storage.get('item').then((val) => {

        console.log(val)
        let arr;
        if (!val) {
          arr = [];
          arr.push(this.item.value)
          console.log("pushed", arr)
          this.storage.set('item', arr);
          this.navCtrl.push(ListPage);
          this.item.reset()
          this.path = ''


        } else if (val) {
          arr = val
          for (let i = 0; i < val.length; i++) {
            console.log("in loop")
            if (this.item.get('title').value !== val[i].title) {
              arr.unshift(this.item.value);
              this.storage.set('item', arr);
              this.navCtrl.push(ListPage);
              this.item.reset()
              this.path = ''
              break;
            } else {
              let toast = this.toastCtrl.create({
                message: 'Dublicated Title! please put another',
                duration: 3000,
                position: 'top'
              });
              toast.onDidDismiss(() => {
                console.log('Dismissed toast')
              });
              toast.present();
              break;
            }
          }
        }


      });

    }

  }

  getItem() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`,
      duration: 5000
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    this.storage.get('item').then((val) => {
      this.list = Array.isArray(val) ? val : [];

    });
    loading.dismiss();

  }

}
