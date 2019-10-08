import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { LivestreamPage } from '../livestream/livestream';
import { IwitnessPage } from '../iwitness/iwitness';
import { ContactPage } from '../contact/contact';
import { PostsPage } from '../posts/posts';





@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = PostsPage;
  tab2Root: any = LivestreamPage;
  tab3Root: any = IwitnessPage;
  tab4Root: any = ContactPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }    
}
