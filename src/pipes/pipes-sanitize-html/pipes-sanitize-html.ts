import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Generated class for the PipesSanitizeHtmlPipe pipe.
 */
@Pipe({
  name: 'sanitizeHtml',
})
export class SanitizeHtmlPipe implements PipeTransform {

	constructor(private _sanitizer:DomSanitizer) {}
	
  /**
   * Takes a value and makes it lowercase.
   */
  transform(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}
