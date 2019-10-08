import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-iwitness',
  templateUrl: 'iwitness.html'
})
export class IwitnessPage {
    url : any;
    constructor(sanitize: DomSanitizer) { 
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://tvcnigeria.thrilliant.com.ng/i-witness");
    }
}
