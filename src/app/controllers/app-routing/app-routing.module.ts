import { NgModule } from '@angular/core';
import { RouterModule, Routes, RoutesRecognized } from '@angular/router';
import { HomePageComponent } from '../../views/pages/home-page/home-page.component';
import { ArchivePageComponent } from '../../views/pages/archive-page/archive-page.component';
import { PostPageComponent } from '../../views/pages/post-page/post-page.component';
import { SearchPageComponent } from '../../views/pages/search-page/search-page.component';
import { NotFoundPageComponent } from '../../views/pages/not-found-page/not-found-page.component';
import { TagListPageComponent } from '../../views/pages/tag-list-page/tag-list-page.component';
import { AboutPageComponent } from '../../views/pages/about-page/about-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'tag', component: TagListPageComponent},
  {path: 'archive/:type/:slug', component: ArchivePageComponent},
  {path: 'archive/:type/:slug/:page', component: ArchivePageComponent},
  {path: 'post/:slug', component: PostPageComponent},
  {path: 'search', component: SearchPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: '**', component: NotFoundPageComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
