import { Component } from '@angular/core';
import { PopoverController,  NavParams } from 'ionic-angular';
import { Service } from '../../providers/service';

import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  name: any;
  page: any;
  id : any;
  settings: any;

  constructor(public service: Service, public params: NavParams, public popoverCtrl: PopoverController) { 

    this.id = params.data;

   if(!this.id.length){
     this.service.getSettings()
       .then((results) => this.handleResults(results));
   }

   else{
   
    this.service.getPage(this.id)
        .then((results) => this.page = results);
   }
  }

  handleResults(results){
     this.service.getPage(results.pages.about)
        .then((results) => this.page = results);
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}
