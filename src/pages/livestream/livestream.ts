import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


@Component({
  selector: 'page-livestream',
  templateUrl: 'livestream.html'
})
export class LivestreamPage {
  // https://www.youtube.com/embed/live_stream?channel=UCgp4A6I8LCWrhUzn-5SbKvA&showinfo=0&controls=1&rel=0
  url : any;
  constructor( sanitize: DomSanitizer, private youtube: YoutubeVideoPlayer) { 
    // this.url = sanitize.bypassSecurityTrustResourceUrl("http://tvcnigeria.thrilliant.com.ng/");
  }

  ionViewDidEnter() {
    // this.youtube.openVideo('UCgp4A6I8LCWrhUzn-5SbKvA');
    this.youtube.openVideo('O8plfDH-fWo');
  }
  ionViewWillLeave() {
    let listaFrames = document.getElementsByTagName("iframe");
    for (var index = 0; index < listaFrames.length; index++) {
      let iframe = listaFrames[index].contentWindow;
      iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  }
}
