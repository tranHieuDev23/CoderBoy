import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { PostPageComponent } from './views/post-page/post-page.component';
import { ArchivePageComponent } from './views/archive-page/archive-page.component';
import { SearchPageComponent } from './views/search-page/search-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PostPageComponent,
    ArchivePageComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
