import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { NavComponent } from './components/nav/nav.component';
import { ManageComponent } from './components/manage/manage.component';
import { DeletedItemsComponent } from './components/deleted-items/deleted-items.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPostComponent,
    PostsComponent,
    PostDetailComponent,
    NavComponent,
    ManageComponent,
    DeletedItemsComponent,
    SearchListComponent,
    RegisterLoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
