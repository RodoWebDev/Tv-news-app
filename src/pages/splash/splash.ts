import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from "@ionic/storage";
import { HomePage } from "../home/home";
@Component({
  selector: "page-splash",
  templateUrl: "splash.html"
})
export class SplashPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public splashScreen: SplashScreen,
    public storage: Storage
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SplashPage");
  }
  ionViewDidEnter() {
    this.splashScreen.hide();

    setTimeout(() => {
      this.storage.get("hasSeenTutorial").then(hasSeenTutorial => {
        this.navCtrl.setRoot(HomePage);
      });
    }, 1920);
  }
}
