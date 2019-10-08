import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
//import { NavController } from 'ionic-angular';

import { AlertController, NavController } from 'ionic-angular';

import { NgForm } from '@angular/forms';

import { UserData } from '../../providers/user-data';
import { SignupPage } from '../signup/signup';
import { PostsPage } from '../posts/posts';

import { Service } from '../../providers/service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Functions } from '../../providers/functions';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  login: any = {};
  submitted = false;
  error: any;
  facebookSpinner: boolean = false;
  googleSpinner: boolean = false;

  constructor(public service: Service, public alertCtrl: AlertController, public nav: NavController, public userData: UserData, public functions: Functions, private fb: Facebook, private googlePlus: GooglePlus ) {

  }

  ngAfterViewInit() {
    //this.getUsername();
  }

  onSignup() {
    this.nav.push(SignupPage);
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      console.log(form)
     
      this.service.login(this.login)
         .then((results: any) => {
           console.log(results);
          if(results.data.status == true){
            this.userData.login(this.login.username);
            this.service.loggedInn = true;
            this.nav.setRoot(PostsPage);
          }
          if(results.data.status == false){
            this.error = results.message;
          }
          if(results.errors){
            this.error = 'Invalid Username or Password'
          }
      });

      
    }
  }

  facebookLogin(){
      this.facebookSpinner = true;
      this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) =>{ 
        
        this.userData.login(this.login.username);
        this.service.loggedInn = true;
        this.facebookSpinner = false;
        this.nav.setRoot(PostsPage);
        this.functions.showAlert('success', "Successfully Logged In");

        this.service.faceBookLogin(res.authResponse.accessToken)
            .then((results) => {
               this.nav.pop();
        });


    })
  .catch(e => { console.log('Error logging into Facebook', e);
    this.functions.showAlert('Error', e);
    this.facebookSpinner = false;
    });
  }


  gmailLogin(){
    this.googleSpinner = true;
    this.googlePlus.login({})
      .then(res => {console.log(res);

        this.userData.login(this.login.username);
        this.service.loggedInn = true;
        this.googleSpinner = false;
        this.nav.setRoot(PostsPage);

        this.userData.setUsername(res.displayName);
        this.userData.setImage(res.imageUrl);

        this.service.googleLogin(res.userId, res.email, res.displayName, res.displayName)
            .then((results) => {
               this.nav.pop();
        });


    })
    .catch(err =>{ console.error(err);
      this.functions.showAlert('Error logging into Google', err);
      this.googleSpinner = false;
    });
  }
}
