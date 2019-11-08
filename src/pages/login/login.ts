import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public storage: Storage, private toastCtrl: ToastController) {
    this.user = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]{2,}\\.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-z0-9]*(?=.*?[#?!@$%^&*-])[a-zA-z0-9]*.{6}$'), Validators.minLength(6)])]
    })

  };

  //log in
  logForm() {
    console.log(this.user.value);
    if (this.user.valid) {
      this.storage.set("user", this.user.value)
      this.navCtrl.push(HomePage)
      this.navCtrl.setRoot(HomePage)
    } else if (this.email.invalid && this.password.valid) {
      console.log("here");
      let toast = this.toastCtrl.create({
        message: 'Please fill your Email !',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

    } else if (this.password.invalid && this.email.valid) {
      let toast = this.toastCtrl.create({
        message: 'Please fill your Password .',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

    } else if (this.password.invalid && this.email.invalid) {
      let toast = this.toastCtrl.create({
        message: 'Please fill your login Data',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

    }
  }
  get email() {
    return this.user.get('email')

  }
  get password() {
    return this.user.get('password')

  }

}
