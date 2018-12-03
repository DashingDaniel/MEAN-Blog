import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/post.service';
import { NavbarService } from 'src/app/navbar.service';

@Component({
  selector: 'app-deleted-items',
  templateUrl: './deleted-items.component.html',
  styleUrls: ['./deleted-items.component.css']
})
export class DeletedItemsComponent implements OnInit {
  posts: Post[]
  comments:[];
  constructor(private postService: PostService, private nav: NavbarService) { }

  ngOnInit() {
    this.GetAllPosts();
    this.GetAllComments();
    this.nav.show();
  }

  GetAllPosts(){
    return this.postService.getUserPosts()
    .subscribe((results:Post[])=>{
      this.posts = results;
    })
  }

  GetAllComments(){
    return this.postService.getUserComments()
    .subscribe((results:[])=>{
      this.comments = results;
      console.log('comments: ', this.comments);
    })
  }
  onToggleDelete(post){
    return this.postService.toggleDelete(post.post_id)
    .subscribe((result:any)=>{
      console.log(result.msg);
      if(result.msg == 'result updated'){
        this.GetAllPosts();
      }
    })
  }

  onToggleDeleteComment(comment){
    console.log('Comment id: ',comment.comment_id);
    return this.postService.toggleCommentDelete(comment.comment_id)
    .subscribe((result:any)=>{
      if(result.msg == 'result updated'){
        this.ngOnInit();
      }
    })
  }
}