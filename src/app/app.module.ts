import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { ListPage } from '../pages/list/list';
import { LandinPage } from '../pages/landin/landin';
import { BlogPage } from '../pages/blog/blog';
import { CreatePostPage } from '../pages/create-post/create-post';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ListPage,
    LandinPage,
    BlogPage,
    CreatePostPage


  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ListPage,
    LandinPage,
    BlogPage,
    CreatePostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }


  ]
})
export class AppModule { }
