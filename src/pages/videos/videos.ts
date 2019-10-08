import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";

import { VideoPostPage } from "../video-post/video-post";
import { HomePage } from "../home/home";
import { IwitnessPage } from "../iwitness/iwitness";

import { Service } from "../../providers/service";

import { ScrollHideConfig } from "../../directives/scroll-hide/scroll-hide";
import { ScheduleFilterPage } from "../schedule-filter/schedule-filter";

/**
 * Generated class for the VideosPage page.
 */
@Component({
  selector: "page-videos",
  templateUrl: "videos.html"
})
export class VideosPage {
  headerScrollConfig: ScrollHideConfig = {
    cssProperty: "margin-top",
    maxValue: 56
  };
  footerScrollConfig: ScrollHideConfig = {
    cssProperty: "margin-bottom",
    maxValue: undefined
  };

  segment = "business";
  categories: any = [];
  categoryPosts: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: Service,
    public modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    // console.log('ionViewDidLoad VideosPage');
    this.service.getVideoCategories().then((results: any) => {
      this.categories = results.map(res => {
        console.log(res);
        this.loadPosts(res.id);
        return res;
      });
    });
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave VideosPage");
    let listaFrames = document.getElementsByTagName("iframe");
    for (var index = 0; index < listaFrames.length; index++) {
      let iframe = listaFrames[index].contentWindow;
      iframe.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*"
      );
    }
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage);
    modal.present();

    // modal.onWillDismiss((data: any[]) => {
    //   if (data) {
    //     this.excludeTracks = data;
    //     this.updateSchedule();
    //   }
    // });
  }

  loadPosts(id: any) {
    return new Promise(resolve => {
      if (this.categoryPosts["" + id]) {
        resolve(this.categoryPosts["" + id]);
      } else {
        this.service.getVideoCategoryPosts(id, 1).then((result: any) => {
          console.log("loadPosts", id, result);
          this.categoryPosts["" + id] = result;
          console.log(result);
          resolve([]);
        });
      }
    });
  }

  getPost(item) {
    this.ionViewWillLeave();
    this.navCtrl.push(VideoPostPage, item);
  }

  showHome() {
    this.navCtrl.setRoot(HomePage);
  }
  showReport() {
    this.ionViewWillLeave();
    this.navCtrl.push(IwitnessPage);
  }
}
