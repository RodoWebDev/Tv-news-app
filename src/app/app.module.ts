import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SplashScreen } from "@ionic-native/splash-screen";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";

import { IonicStorageModule } from "@ionic/storage";
import { ConferenceApp } from "./app.component";
import { AboutPage } from "../pages/about/about";
import { LoginPage } from "../pages/login/login";
import { MapPage } from "../pages/map/map";
import { PostPage } from "../pages/post/post";
import { CategoryPostPage } from "../pages/category-post/category-post";
import { PopoverPage } from "../pages/about-popover/about-popover";
import { AccountPage } from "../pages/account/account";
import { PostsPage } from "../pages/posts/posts";
import { ScheduleFilterPage } from "../pages/schedule-filter/schedule-filter";
import { SignupPage } from "../pages/signup/signup";
import { TabsPage } from "../pages/tabs-page/tabs-page";
import { TutorialPage } from "../pages/tutorial/tutorial";
import { SearchPage } from "../pages/search/search";
import { VideoPage } from "../pages/playlist-page/playlist-page";
import { PlaylistVideoPage } from "../pages/playlist-videos/playlist-videos";
import { HomePage } from "../pages/home/home";
import { VideosPage } from "../pages/videos/videos";
import { VideoPostPage } from "../pages/video-post/video-post";

import { LivestreamPage } from "../pages/livestream/livestream";
import { IwitnessPage } from "../pages/iwitness/iwitness";
import { ContactPage } from "../pages/contact/contact";
import { SupportPage } from "../pages/support/support";

import { PipesModule } from "../pipes/pipes.module";

import { Service } from "../providers/service";
import { Functions } from "../providers/functions";
import { UserData } from "../providers/user-data";

import { Facebook } from "@ionic-native/facebook";
import { GooglePlus } from "@ionic-native/google-plus";
import { EmailComposer } from "@ionic-native/email-composer";
import { OneSignal } from "@ionic-native/onesignal";
import { SocialSharing } from "@ionic-native/social-sharing";

import { DirectivesModule } from "../directives/directives.module";

import { KeysPipe } from "../providers/pipe";

import { AppRate } from "@ionic-native/app-rate";
import { YoutubePipe } from "../providers/youtube/youtube";

import { AdMobPro } from "@ionic-native/admob-pro";
import { SplashPage } from "../pages/splash/splash";
import { TimeAgoPipe } from "time-ago-pipe";

@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    HomePage,
    MapPage,
    PostPage,
    PopoverPage,
    PostsPage,
    ScheduleFilterPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    CategoryPostPage,
    KeysPipe,
    SearchPage,
    VideoPage,
    YoutubePipe,
    PlaylistVideoPage,
    LivestreamPage,
    IwitnessPage,
    ContactPage,
    SupportPage,
    VideosPage,
    VideoPostPage,
    SplashPage,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(
      ConferenceApp,
      {},
      {
        links: [
          { component: HomePage, name: "HomePage", segment: "home-page" },
          { component: TabsPage, name: "TabsPage", segment: "tabs-page" },
          { component: PostsPage, name: "Schedule", segment: "schedule" },
          { component: LoginPage, name: "LoginPage", segment: "login" },
          {
            component: ScheduleFilterPage,
            name: "ScheduleFilter",
            segment: "scheduleFilter"
          },
          { component: MapPage, name: "Map", segment: "map" },
          { component: AboutPage, name: "About", segment: "about" },
          { component: TutorialPage, name: "Tutorial", segment: "tutorial" },
          { component: AccountPage, name: "AccountPage", segment: "account" },
          { component: SignupPage, name: "SignupPage", segment: "signup" },

          {
            component: LivestreamPage,
            name: "LivestreamPage",
            segment: "livestream"
          },
          {
            component: IwitnessPage,
            name: "IwitnessPage",
            segment: "iwitness"
          },
          { component: ContactPage, name: "ContactPage", segment: "contact" }
        ]
      }
    ),
    IonicStorageModule.forRoot(),
    PipesModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    LoginPage,
    HomePage,
    AccountPage,
    PostPage,
    PopoverPage,
    MapPage,
    PostsPage,
    ScheduleFilterPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    CategoryPostPage,
    SearchPage,
    VideoPage,
    PlaylistVideoPage,
    LivestreamPage,
    IwitnessPage,
    VideosPage,
    VideoPostPage,
    ContactPage,
    SplashPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    YoutubeVideoPlayer,
    Service,
    UserData,
    InAppBrowser,
    SplashScreen,
    Functions,
    EmailComposer,
    Facebook,
    GooglePlus,
    OneSignal,
    SocialSharing,
    AppRate,
    AdMobPro
  ]
})
export class AppModule {}
