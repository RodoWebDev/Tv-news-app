import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';
import { SignupPage } from '../signup/signup';
import { AboutPage } from '../about/about';
import { TabsPage } from '../tabs-page/tabs-page';
import { EmailComposer } from '@ionic-native/email-composer';
import { Service } from '../../providers/service';
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;
  image: any;
  login: any = {};
  submitted = false;
  error: any;
  items: any;
  settings: any;

  constructor(public service: Service, public alertCtrl: AlertController, public nav: NavController, public userData: UserData, private emailComposer: EmailComposer, private appRate: AppRate, private socialSharing: SocialSharing) {

  this.image = 'assets/img/user-profile.png';
  this.service.getSettings()
       .then((results) => this.settings=results);
  }

  ngAfterViewInit() {
    this.getUsername();
    this.getImage();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  getImage() {
    this.userData.getImage().then((image) => {
      if(image)
      this.image = image;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.service.loggedInn = false;
    this.image = 'assets/img/user-profile.png';
  }

  onSignup() {
    this.nav.push(SignupPage);
  }

  about(id){
    this.nav.push(AboutPage, id);
  }

  privacy(id){
    this.nav.push(AboutPage, id);
  }

  terms(id){
    this.nav.push(AboutPage, id);
  }

  composer(){
    let email = {
      to: 'rahamsolution@gmail.com',
      subject: '',
      body: '<br>Hi There<br>',
      isHtml: true
    };


    this.emailComposer.open(email);
  }
  

  loginPage(){
    this.nav.push(LoginPage);
  }
  

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      console.log(form)
     
      this.service.login(this.login)
         .then((results: any) => {
           console.log(results);
          if(results.status == true){
            this.userData.login(this.login.username);
            this.service.loggedInn = true;
            this.nav.push(TabsPage);
          }
          if(results.status == false){
            this.error = results.message;
          }
          if(results.errors){
            this.error = 'Invalid Username or Password'
          }
      });

      
    }
  }

  appRates(){
      this.appRate.preferences.storeAppURL = {
      ios: '<app_id>',
      android: 'market://details?id=<package_name>',
      windows: 'ms-windows-store://review/?ProductId=<store_id>'
      };

      this.appRate.promptForRating(true);
  }

    share(){
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: 'Check this out', // not supported on some apps (Facebook, Instagram)
      subject: 'Blog App', // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'mstoreapp.com',
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }
    this.socialSharing.shareWithOptions(options);
  }
}
