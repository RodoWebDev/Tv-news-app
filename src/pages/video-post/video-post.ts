import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, FabContainer } from 'ionic-angular';


import { SocialSharing } from '@ionic-native/social-sharing';


/**
 * Generated class for the VideoPostPage page.
 */
@Component({
  selector: 'page-video-post',
  templateUrl: 'video-post.html',
})
export class VideoPostPage {
	post: any = {};
	message: any;
  url: any;
  image: any;

  constructor(public navCtrl: NavController, public params: NavParams, 
  	public loadingCtrl: LoadingController, private socialSharing: SocialSharing) {
  	this.post = params.data;
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPostPage');
  }


  shareWithFb(post, network: string, fab: FabContainer){
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    
      this.message = post.title; // not supported on some apps (Facebook, Instagram)
      this.image = post.thumbnail; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = post.url;
     // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.present();
    loading.onWillDismiss(() => {
      fab.close();
    });
    

    this.socialSharing.shareViaFacebook(this.message, this.image, this.url);
  }

  shareWithTw(post, network: string, fab: FabContainer){
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    
      this.message = post.title; // not supported on some apps (Facebook, Instagram)
      this.image = post.thumbnail; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = post.url;
     // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.present();
    loading.onWillDismiss(() => {
      fab.close();
    });
    
    this.socialSharing.shareViaTwitter(this.message, this.image, this.url);
  }

    shareWithGmail(post){
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    
      this.message = post.title; // not supported on some apps (Facebook, Instagram)
      this.image = post.thumbnail; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = post.url;
     // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    

    this.socialSharing.shareViaEmail(this.url, this.message, [this.image]);
  }

   shareWithWhatsapp(post, network: string, fab: FabContainer){
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    
      this.message = post.title; // not supported on some apps (Facebook, Instagram)
      this.image = post.thumbnail; // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      this.url = post.url;
     // chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();

     this.socialSharing.shareViaWhatsApp(this.message, this.image, this.url);
  }


}
