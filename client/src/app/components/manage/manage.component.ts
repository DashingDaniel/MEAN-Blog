import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/post';
import {Router} from "@angular/router";
import { NavbarService } from 'src/app/navbar.service';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  posts: Post[];
  selectedPost: Post;
  userComments:[];
  comment_data: string;
  comment_id: number;
  editCommentToggle: boolean = false;
  // selectedComment: boolean = false;
  constructor(private postService: PostService, private router: Router, private nav: NavbarService) { }

  ngOnInit() {
    this.GetUserPosts();
    this.GetUserComments();
    this.nav.show();
    if(localStorage.getItem('token')==null){
      this.router.navigate([""])
    }
  }

  GetUserPosts(){
    return this.postService.getUserPosts()
    .subscribe((results:Post[])=>{
      this.posts = results;
    })
  }

  GetUserComments(){
    return this.postService.getUserComments()
    .subscribe((results:[])=>{
      this.userComments = results;
    })
  }

  onSelect(post){
    this.selectedPost = post;
    console.log(this.selectedPost);
  }
  onUpdatePost(){
    this.postService.updatePost(this.selectedPost,this.selectedPost.post_id)
    .subscribe((result:Post[])=>{
      // changed
      console.log(result);
      
    })
    this.selectedPost = null;
  }

  onToggleDeleteClick(){
    console.log('Delete Button Clicked');
    return this.postService.toggleDelete(this.selectedPost.post_id)
    .subscribe((result:any)=>{
      console.log(result);
      if(result.msg == 'result updated'){
        this.selectedPost = null;
        this.GetUserPosts();
      }
    })
  }

  enableCommentEdit(comment_data,comment_id){
    this.comment_data = comment_data;
    this.comment_id = comment_id;
    this.editCommentToggle = true;
    // this.selectedComment = true;
  }

  saveUpdatedComment(){
    this.postService.updateComment(this.comment_data,this.comment_id)
    .subscribe((result:any)=>{
      if(result.msg == 'Comment updated successfully'){
        this.editCommentToggle = false;
        this.ngOnInit();
      }
    })
  }
  deleteComment(comment_id){
    this.postService.toggleCommentDelete(comment_id)
    .subscribe((result:any)=>{
      if(result.msg == 'result updated'){
        console.log(result.msg);
        this.ngOnInit();
      }
    })
  }
}
