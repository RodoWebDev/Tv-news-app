import { Component, ViewChild } from '@angular/core';
import { NavParams, Content, NavController } from 'ionic-angular';
import { Service } from '../../providers/service';
import { PostPage } from '../post/post';


@Component({
  templateUrl: 'search.html'

})
export class SearchPage {
   @ViewChild(Content) content: Content;
  
   searchLoading: boolean = false;
   has_more_items: boolean = true;
   page: number = 1;
   myInput: any;
   searchKey: any;
   search: any;
   post: any;
    

  constructor(public params: NavParams, public service: Service, public nav: NavController) {

        this.myInput = "";
        this.page = 1;
        this.search = params.data.searchResults;
        this.searchKey = params.data.searchKey;
        console.log(this.searchKey);
  }
  

    onInput($event) {
        this.searchLoading =  true;
        this.searchKey = $event.srcElement.value;     

        if(this.searchKey){   
        this.service.getSearch(this.searchKey, this.page)
            .then((results) => {this.searchLoading = false; this.search = results});
        }

        else{
          this.searchLoading =  false;
        }
            
    }

    onCancel($event) {
        this.searchLoading = false;
        console.log('cancelled');
    }

    getPost(id, name) {        
      this.post = [];
      this.post.id = id;
      this.post.name = name;
      this.nav.push(PostPage, this.post);
    }

    doInfinite(infiniteScroll) {
        this.page += 1;
        this.service.getSearch(this.searchKey, this.page)
            .then((results) => this.handleMore(results, infiniteScroll));
    }

    handleMore(results, infiniteScroll) {
        if (results.posts != undefined) {

            for (var i = 0; i < results.posts.length; i++) {
                this.search.posts.push(results.posts[i]);
                
            };
        }
        if (results.count == 0) {
            this.has_more_items = false;
        }
        infiniteScroll.complete();
    }


}
 
       