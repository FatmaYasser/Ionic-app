import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LandinPage } from '../pages/landin/landin';
import { BlogPage } from '../pages/blog/blog';
import { CreatePostPage } from '../pages/create-post/create-post';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav

  rootPage: any = LandinPage
  activePage: any
  pages: Array<{ title: string, component: any }>

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      { title: 'Blog', component: BlogPage },
      { title: 'Create Post', component: CreatePostPage }
    ]
    this.activePage = this.pages[0]
  }
  openPage(page) {
    this.nav.push(page.component)
    this.activePage = page
  }
  checkActive(page) {
    return page == this.activePage
  }
}

