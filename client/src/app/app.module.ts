import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { NavComponent } from './components/nav/nav.component';
import { ManageComponent } from './components/manage/manage.component';
import { DeletedItemsComponent } from './components/deleted-items/deleted-items.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPostComponent,
    PostsComponent,
    PostDetailComponent,
    NavComponent,
    ManageComponent,
    DeletedItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
