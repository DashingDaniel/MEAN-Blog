import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ManageComponent } from './components/manage/manage.component';
import { DeletedItemsComponent } from './components/deleted-items/deleted-items.component';

const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'addPost', component: AddPostComponent},
  {path: 'postDetail/:id', component: PostDetailComponent},
  {path: 'manage', component: ManageComponent},
  {path: 'manageDeleted', component: DeletedItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
