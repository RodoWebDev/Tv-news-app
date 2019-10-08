import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { SocialSharing } from '@ionic-native/social-sharing';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'playlist-videos.html'
})
export class PlaylistVideoPage {

  page: any;
  id : any;
  post: any;
  has_more_items: boolean = false;
  playlistid: string;
  channelId : string = "UCgp4A6I8LCWrhUzn-5SbKvA";
  maxRes = '50';
  key: string = "AIzaSyDBQzAYtBDUH2FnkH0yBfkd9oDj_bkTuPM";
  videosList: any = [];
  loader: boolean = true;
  name: any;

  constructor(public nav: NavController, public http: Http, public params: NavParams) {

     this.page = 1;
     this.playlistid = params.data.id;
     this.name = params.data.name;

     let url = "https://www.googleapis.com/youtube/v3/playlistItems?part=id,snippet&channelId="+this.channelId+ "&playlistId="+this.playlistid+"&type=video&order=date&maxResults="+this.maxRes+"&key="+this.key;

     this.http.get(url).map(res=>res.json()).subscribe(data => {
              this.videosList = data;
              this.loader = false;
              console.log(this.videosList);
       });
   
  }

  ionViewWillLeave() {
    let listaFrames = document.getElementsByTagName("iframe");
 
    for (var index = 0; index < listaFrames.length; index++) {
     let iframe = listaFrames[index].contentWindow;
     iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
   }
 }

}
