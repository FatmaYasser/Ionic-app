import { Component } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreatePostPage } from '../create-post/create-post';


@IonicPage()
@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html',
})
export class BlogPage {
  posts: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http.get('https://jsonplaceholder.typicode.com/posts').map(res => res.json()).subscribe(
      data => {
        this.posts = data
      }
    )
  }

  ionViewDidLoad() {
    // this.provid.getData().subscribe((response) => {
    //   this.posts = response
    //   console.log(this.posts)
    // })
  }
  go() {
    this.navCtrl.push(CreatePostPage)
  }
}
