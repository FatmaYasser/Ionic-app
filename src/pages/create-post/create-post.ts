import { Component, Output } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the CreatePostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})
export class CreatePostPage {
  @Output('item') post: FormGroup;
  constructor(private formBuilder: FormBuilder, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.post = this.formBuilder.group({

      header: ['', Validators.required],
      content: ['', Validators.required],

    });
  }
  // postnew() {
  //   this.http.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(this.post.value), {
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8"
  //     }
  //   }).subscribe(data => {

  //   })
  // }

  postnew() {
    if (this.post.valid) {
      this.http.post('https://jsonplaceholder.typicode.com/posts', this.post.value).subscribe(res => {
        console.log(res['id']);
        this.presentToast();
        //alert
      })
    } else {
      let toast = this.toastCtrl.create({
        message: 'empty data fill it ..',
        duration: 2000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'post was added successfully',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePostPage');
  }

}
