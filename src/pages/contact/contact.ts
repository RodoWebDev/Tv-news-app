import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ModalController } from "ionic-angular";
import { ScheduleFilterPage } from "../schedule-filter/schedule-filter";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html"
})
export class ContactPage {
  url: any;
  constructor(sanitize: DomSanitizer, public modalCtrl: ModalController) {
    this.url = sanitize.bypassSecurityTrustResourceUrl(
      "http://tvcnigeria.thrilliant.com.ng/contact"
    );
  }
}
