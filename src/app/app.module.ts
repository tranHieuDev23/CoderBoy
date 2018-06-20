import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LazyLoadImagesModule } from "ngx-lazy-load-images";
import { ScrollEventModule } from "ngx-scroll-event";
import { HighlightJsModule } from "angular2-highlight-js";

import { AppComponent } from './app.component';
import { HomePageComponent } from './views/pages/home-page/home-page.component';
import { PostPageComponent } from './views/pages/post-page/post-page.component';
import { ArchivePageComponent } from './views/pages/archive-page/archive-page.component';
import { SearchPageComponent } from './views/pages/search-page/search-page.component';
import { TopBarComponent } from './views/components/top-bar/top-bar.component';
import { AppRoutingModule } from './controllers/app-routing/app-routing.module';
import { NotFoundPageComponent } from './views/pages/not-found-page/not-found-page.component';
import { CarouselComponent } from './views/components/carousel/carousel.component';
import { CarouselPostItemComponent } from './views/components/carousel/carousel-post-item/carousel-post-item.component';
import { PostPreviewDisplayComponent } from './views/components/post-preview-display/post-preview-display.component';
import { SectionHeadComponent } from './views/components/section-head/section-head.component';
import { CategoriesNewPostComponent } from './views/pages/home-page/categories-new-post/categories-new-post.component';
import { FooterComponent } from './views/components/footer/footer.component';
import { SafeHtmlPipe } from './views/pipes/safe-html.pipe';
import { TagListItemComponent } from './views/components/tag-list-item/tag-list-item.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LazyLoadImagesModule,
    ScrollEventModule,
    HighlightJsModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    PostPageComponent,
    ArchivePageComponent,
    SearchPageComponent,
    TopBarComponent,
    NotFoundPageComponent,
    CarouselComponent,
    CarouselPostItemComponent,
    PostPreviewDisplayComponent,
    SectionHeadComponent,
    CategoriesNewPostComponent,
    FooterComponent,
    SafeHtmlPipe,
    TagListItemComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
