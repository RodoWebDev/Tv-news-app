import { Component, ViewChild } from "@angular/core";
import {
  Events,
  MenuController,
  Nav,
  Platform,
  ModalController
} from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from "@ionic/storage";
import { AccountPage } from "../pages/account/account";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { TabsPage } from "../pages/tabs-page/tabs-page";
import { HomePage } from "../pages/home/home";
import { TutorialPage } from "../pages/tutorial/tutorial";
import { CategoryPostPage } from "../pages/category-post/category-post";

import { Service } from "../providers/service";
import { UserData } from "../providers/user-data";
import { EmailComposer } from "@ionic-native/email-composer";
import { VideoPage } from "../pages/playlist-page/playlist-page";
import { SplashPage } from "../pages/splash/splash";

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: "app.template.html"
})
export class ConferenceApp {
  @ViewChild(Nav) nav: Nav;

  loggedInPages: PageInterface[] = [
    {
      title: "Account",
      name: "TabsPage",
      component: TabsPage,
      tabComponent: AccountPage,
      index: 1,
      icon: "md-contact"
    },
    {
      title: "Logout",
      name: "TabsPage",
      component: TabsPage,
      icon: "md-log-out",
      logsOut: true
    }
  ];
  loggedOutPages: PageInterface[] = [
    {
      title: "Login",
      name: "LoginPage",
      component: LoginPage,
      icon: "md-log-in"
    },
    {
      title: "Signup",
      name: "SignupPage",
      component: SignupPage,
      icon: "md-person-add"
    }
  ];
  rootPage: any;
  categories: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public service: Service,
    public storage: Storage,
    public splashScreen: SplashScreen,
    private emailComposer: EmailComposer,
    private modalCtrl: ModalController
  ) {
    this.platformReady();
    this.userData.hasLoggedIn().then(hasLoggedIn => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
  }

  getCategory(item) {
    this.nav.setRoot(CategoryPostPage, item);
  }

  goHome() {
    this.nav.setRoot(TabsPage);
  }

  support() {
    let email = {
      to: "rahamsolution@gmail.com",
      subject: "",
      body: "<br>Hi There<br>",
      isHtml: true
    };

    this.emailComposer.open(email);
  }

  youtube() {
    this.nav.push(VideoPage);
  }

  openPage(page: PageInterface) {
    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }

    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        //console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.service.loggedInn = false;
      this.userData.logout();
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe("user:login", () => {
      this.enableMenu(true);
    });

    this.events.subscribe("user:signup", () => {
      this.enableMenu(true);
    });

    this.events.subscribe("user:logout", () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, "loggedInMenu");
    this.menu.enable(!loggedIn, "loggedOutMenu");
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.rootPage = SplashPage;
      // this.splashScreen.hide();
      // this.service.getCategories()
      //  .then((results: any) => this.categories = results);
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (
        childNav.getSelected() &&
        childNav.getSelected().root === page.tabComponent
      ) {
        return "primary";
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return "primary";
    }
    return;
  }
}
