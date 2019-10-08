import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { Service } from '../../providers/service';
import { LoginPage } from '../login/login';

import { AccountPage } from '../account/account';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: any = { email: '', password: '' };
  submitted = false;
  error: any;

  constructor(public navCtrl: NavController, public userData: UserData, public service: Service) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.service.register(this.signup)
         .then((results: any) => {
          console.log(results.status);
          if(results.status == true){
            this.userData.login(this.signup.email);
            this.service.loggedInn = true;
            this.navCtrl.setRoot(AccountPage);
          }
          if(results.status == false){
            this.submitted = false;
            this.error = results.message;
          }
      });
    }
  }

  onSignIn(){
    this.navCtrl.push(LoginPage);
  }
}
