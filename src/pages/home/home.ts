import { Component, ViewChild, ViewChildren } from "@angular/core";
import {
  Content,
  AlertController,
  App,
  FabContainer,
  ItemSliding,
  List,
  ModalController,
  NavController,
  ToastController,
  LoadingController,
  Refresher,
  Slides
} from "ionic-angular";
import { Service } from "../../providers/service";
import { UserData } from "../../providers/user-data";
import { PostsPage } from "../posts/posts";
import { PostPage } from "../post/post";
import { SearchPage } from "../search/search";
import { VideosPage } from "../videos/videos";
import { ScheduleFilterPage } from "../schedule-filter/schedule-filter";
import { IwitnessPage } from "../iwitness/iwitness";

// import { AdMobPro } from '@ionic-native/admob-pro';
import { Platform } from "ionic-angular";

import { ScrollHideConfig } from "../../directives/scroll-hide/scroll-hide";

/**
 * Generated class for the HomePage page.
 */
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("tabs") tabs: Slides;
  @ViewChild("slider") slider: Slides;
  @ViewChildren("posts") postsView: any;

  @ViewChild("scheduleList", { read: List }) scheduleList: List;
  @ViewChild(Content) content: Content;
  @ViewChild(Content) pageContent: Content;

  headerScrollConfig: ScrollHideConfig = {
    cssProperty: "margin-top",
    maxValue: 56
  };
  footerScrollConfig: ScrollHideConfig = {
    cssProperty: "margin-bottom",
    maxValue: undefined
  };

  dayIndex = 0;
  queryText = "";
  segment = "latest";
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  politics: any;
  business: any;
  sports: any;
  topStories: any;
  featuredStories: any;
  // showRecent: boolean = false;
  filter: any = {};
  hasMoreStories: boolean = true;
  hasMoreTopStories: boolean = true;
  myInput: any;
  searchKey: any;
  search: any;
  page: any;

  public categories: Array<{ id: number; key: string; desc: string }>;
  public selectedCategory: { id: number; key: string; desc: string };

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, //private admob : AdMobPro,
    public toastCtrl: ToastController,
    public service: Service,
    public user: UserData,
    platform: Platform
  ) {
    this.categories = [
      { id: 0, key: "latest", desc: "breaking news" },
      { id: 1, key: "politics", desc: "politics" },
      { id: 2, key: "business", desc: "business" },
      { id: 3, key: "sports", desc: "sports" }
    ];

    // Select it by defaut
    this.selectedCategory = this.categories[0];

    this.myInput = "";
    this.page = 1;
    this.filter.politicsPage = 1;
    this.filter.businessPage = 1;
    this.filter.sportsPage = 1;
    this.filter.topStoriesPage = 1;

    this.service.getRecentPosts(this.filter.topStoriesPage).then(results => {
      console.log(results);
      this.filter.topLoader = false;
      this.topStories = results;
    });

    this.service.getFeaturedPosts().then(results => {
      this.filter.featuredLoader = false;
      this.featuredStories = results;
    });

    platform.ready().then(() => {
      /*
      var admobid = {
          banner: 'ca-app-pub-6144757317783664/3227023051',
          interstitial: 'ca-app-pub-6144757317783664~1515374182'
      };

      if (platform.is('cordova')) {
        this.admob.createBanner({
            adId: admobid.banner,
            isTesting: true,
            autoShow: true,
            position: this.admob.AD_POSITION.BOTTOM_CENTER
        });
        this.admob.prepareInterstitial({
            adId: admobid.interstitial,
            isTesting: true
        }).then(() => { this.admob.showInterstitial(); });
      }
      */
    });
  }

  ionViewDidLoad() {
    this.filter.postLoader = true;
    this.filter.politicsLoader = true;
    this.filter.businessLoader = true;
    this.filter.sportsLoader = true;
    this.app.setTitle("Schedule");
    this.updateSchedule();

    this.service.getRecentPosts(this.filter.topStoriesPage).then(results => {
      this.filter.topLoader = false;
      this.topStories = results;
      // console.log("topStories", this.topStories);
    });
    // console.log(this.selectedCategory);
    // this.tabChanged(this.selectedCategory);
    /*
    this.service.getCategoryPost('297', this.filter.politicsPage) //  'politics'
    .then((results) => {this.filter.politicsLoader = false; this.politics = results});

    this.service.getCategoryPost('2', this.filter.businessPage) // business
    .then((results) => {this.filter.businessLoader = false; this.business = results});

    this.service.getCategoryPost('33', this.filter.sportsPage) // sports
    .then((results) => {this.filter.sportsLoader = false; this.sports = results});
*/
    this.content.resize();

    this.pageContent = this.postsView._results[0];
  }

  //search starts
  onInput($event) {
    this.searchKey = $event.srcElement.value;
    if (!this.searchKey) {
      this.navCtrl.setRoot(PostsPage);
    } else {
      // this.service.getSearch(this.searchKey, this.page)
      // .then((results) => this.posts = results);
      //  console.log(this.posts);
    }
  }

  onCancel($event) {
    console.log("cancelled");
  }
  //search ends

  getPost(id, name) {
    const item = {
      id: id,
      name: name
    };
    this.navCtrl.push(PostPage, item);
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.service
      .getTimeline(
        this.dayIndex,
        this.queryText,
        this.excludeTracks,
        this.segment
      )
      .subscribe((data: any) => {
        this.shownSessions = data.shownSessions;
        this.groups = data.groups;
      });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });
  }

  goToPostDetail(post: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push(PostPage, post);
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, "Favorite already added");
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: "Favorite Added",
        buttons: [
          {
            text: "OK",
            handler: () => {
              // close the sliding item
              slidingItem.close();
            }
          }
        ]
      });
      // now present the alert on top of all other content
      alert.present();
    }
  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: "Would you like to remove this session from your favorites?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: "Remove",
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: Math.random() * 1000 + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    if (this.segment == "latest") {
      this.filter.topStoriesPage = 1;
      this.service.getRecentPosts(this.filter.topStoriesPage).then(results => {
        refresher.complete();
        this.topStories = results;
      });
    } else {
      let segmentId = "2";
      if (this.segment == "politics") {
        segmentId = "297";
      } else if (this.segment == "business") {
        segmentId = "2";
      } else if (this.segment == "sports") {
        segmentId = "33";
      }

      this.filter.topStoriesPage = 1;
      this.service
        .getCategoryPost(segmentId, this.filter[this.segment + "Page"])
        .then(results => {
          console.log(results);
          console.log("aqui 2");
          refresher.complete();
          this[this.segment] = results;
        });
    }
  }

  doInfinite(infiniteScroll) {
    console.log("doInfinite", this.segment);
    if (this.segment == "latest") {
      this.filter.topStoriesPage += 1;
      this.service
        .getRecentPosts(this.filter.topStoriesPage)
        .then((results: any) => {
          if (results.posts != undefined) {
            if (this.topStories == undefined) {
              this.topStories = { posts: [] };
            }
            for (var i = 0; i < results.posts.length; i++) {
              this.topStories.posts.push(results.posts[i]);
            }
          }

          if (results.posts.length == 0) {
            this.hasMoreTopStories = false;
          }
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
        });
    } else {
      this.filter[this.segment + "Page"] += 1;

      let segmentId = "2";
      if (this.segment == "politics") {
        segmentId = "297";
      } else if (this.segment == "business") {
        segmentId = "2";
      } else if (this.segment == "sports") {
        segmentId = "33";
      }

      this.service
        .getCategoryPost(segmentId, this.filter[this.segment + "Page"])
        .then((results: any) => {
          console.log(results);
          console.log("aqui");
          if (results.posts != undefined) {
            if (this[this.segment] == undefined) {
              this[this.segment] = { posts: [] };
            }
            for (var i = 0; i < results.posts.length; i++) {
              this[this.segment].posts.push(results.posts[i]);
            }
          }

          if (results.posts.length == 0) {
            this.hasMoreTopStories = false;
          }
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
        });
    }
  }

  showLive() {
    this.navCtrl.setRoot(VideosPage);
  }
  showReport() {
    this.navCtrl.push(IwitnessPage);
  }

  tabChanged(currentIndex?) {
    if (!currentIndex) {
      currentIndex = this.tabs.getActiveIndex();
    }
    this.selectedCategory = this.categories[currentIndex];
    this.segment = this.selectedCategory.key;
    this.slider.slideTo(currentIndex);
    this.pageContent = this.postsView._results[currentIndex];
    this.filter[this.segment + "Page"] = 1;
    this.doInfinite(null);
    console.log("tabChanged", this.content);
    console.log("tabChanged", currentIndex, this.postsView._results);
  }

  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    this.selectedCategory = this.categories[currentIndex];
    this.segment = this.selectedCategory.key;
    this.tabs.slideTo(currentIndex);
    console.log("slideChanged", this.postsView);
  }

  searchPage() {
    this.navCtrl.push(SearchPage);
  }
}
