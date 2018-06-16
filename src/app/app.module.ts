import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './views/pages/home-page/home-page.component';
import { PostPageComponent } from './views/pages/post-page/post-page.component';
import { ArchivePageComponent } from './views/pages/archive-page/archive-page.component';
import { SearchPageComponent } from './views/pages/search-page/search-page.component';
import { TopBarComponent } from './views/components/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PostPageComponent,
    ArchivePageComponent,
    SearchPageComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
