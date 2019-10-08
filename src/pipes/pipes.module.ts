import { NgModule } from "@angular/core";
import { SanitizeHtmlPipe } from "./pipes-sanitize-html/pipes-sanitize-html";
import { CutPipe } from "./cut/cut";
import { DateAgoPipe } from "./date-ago/date-ago";

@NgModule({
  declarations: [SanitizeHtmlPipe, CutPipe, DateAgoPipe],
  imports: [],
  exports: [SanitizeHtmlPipe, CutPipe, DateAgoPipe]
})
export class PipesModule {}
