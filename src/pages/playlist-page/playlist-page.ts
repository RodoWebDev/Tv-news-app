import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { SocialSharing } from '@ionic-native/social-sharing';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PlaylistVideoPage } from '../playlist-videos/playlist-videos';

@Component({
  templateUrl: 'playlist-page.html'
})
export class VideoPage {

  page: any;
  id : any;
  post: any;
  i: number;
  has_more_items: boolean = false;
  channelId : string = "UCgp4A6I8LCWrhUzn-5SbKvA";
  maxRes = '50';
  key: string = "AIzaSyDBQzAYtBDUH2FnkH0yBfkd9oDj_bkTuPM";
  playlist: any = [];
  subcategory: any = [];
  loader: boolean = true;
  item: any;

  constructor(public nav: NavController, public http: Http, public params: NavParams) {

     this.page = 1;

     let url = "https://www.googleapis.com/youtube/v3/playlists?part=id,snippet&channelId="+this.channelId+"&type=video&order=date&maxResults="+this.maxRes+"&key="+this.key;

     this.http.get(url).map(res=>res.json()).subscribe(data => {
              this.playlist = data;
              this.loader = false;
              console.log(this.playlist);
       });

   }

   getPlaylistVideos(id, name){
    this.item = [];
    this.item.id = id;
    this.item.name = name;
    this.nav.push(PlaylistVideoPage, this.item);   
   }

}
