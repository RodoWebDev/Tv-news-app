import { Component, ViewChild } from '@angular/core';
import { AlertController, App, List, ModalController, NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { Service } from '../../providers/service';
import { UserData } from '../../providers/user-data';
import { PostPage } from '../post/post';


@Component({
  templateUrl: 'category-post.html'
})
export class CategoryPostPage {
  
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  posts: any;
  topStories: any;
  showRecent: boolean = false;
  filter: any = {};
  hasMoreStories: boolean = true;
  hasMoreTopStories: boolean = true;
  has_more_items: boolean = false;
  id: any;
  status: any;
  message: any;
  name: any;
  url: any;
  image: any;
  page: any;

  constructor(public alertCtrl: AlertController,public app: App,public loadingCtrl: LoadingController,public modalCtrl: ModalController,public navCtrl: NavController,public toastCtrl: ToastController,public service: Service,public user: UserData,public params: NavParams) {
    console.log(params.data.title);
    this.id = params.data.id;
    this.name = params.data.title;
    this.page = 1;

      this.service.getCategoryPost(this.id, this.page)
        .then((results) => {this.posts = results});

        }

        goToPostDetail(item: any){
          this.navCtrl.push(PostPage, item);
        }

    
  doInfinite(infiniteScroll) {
    this.page += 1;    

    this.service.getCategoryPost(this.id, this.page)
       .then((results) => this.handleMore(results, infiniteScroll));      

    }

    handleMore(results, infiniteScroll){
      if(results.posts != undefined){
        for(var i = 0; i < results.posts.length; i++) {
          this.posts.posts.push(results.posts[i]);
        };
      }
      
      if(results.posts.length == 0) {
        this.has_more_items = false;
      }

      infiniteScroll.complete();
    }

}
