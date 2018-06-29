import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { LazyLoadImagesModule } from "ngx-lazy-load-images";
import { DisqusModule } from "ngx-disqus";

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
import { SafeHtmlPipe } from './views/pipes/safe-html/safe-html.pipe';
import { TagListItemComponent } from './views/components/tag-list-item/tag-list-item.component';
import { LoadingScreenComponent } from './views/components/loading-screen/loading-screen.component';
import { PaginationComponent } from './views/components/pagination/pagination.component';
import { AddPipe } from './views/pipes/add/add.pipe';
import { TagListPageComponent } from './views/pages/tag-list-page/tag-list-page.component';
import { AuthorDisplayComponent } from './views/components/author-display/author-display.component';
import { AboutPageComponent } from './views/pages/about-page/about-page.component';
import { ExtractUrlPipe } from './views/pipes/extract-url/extract-url.pipe';
import { TwitterHandleUrlPipe } from './views/pipes/twitter-handle-url/twitter-handle-url.pipe';
import localeVi from '@angular/common/locales/vi'
import { registerLocaleData } from '@angular/common';
import { HighlightSsrDirective } from './views/directives/highlight-ssr/highlight-ssr.directive';

registerLocaleData(localeVi)

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'coderboy' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    FormsModule,
    LazyLoadImagesModule,
    DisqusModule.forRoot('coderboy23-surge-sh')
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
    TagListItemComponent,
    LoadingScreenComponent,
    PaginationComponent,
    AddPipe,
    TagListPageComponent,
    AuthorDisplayComponent,
    AboutPageComponent,
    ExtractUrlPipe,
    TwitterHandleUrlPipe,
    HighlightSsrDirective
  ],
  providers: [{
    provide: LOCALE_ID, useValue: 'vi'
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
