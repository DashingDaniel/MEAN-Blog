import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/post';
import {Router} from "@angular/router";
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  posts: Post[];
  selectedPost: Post;
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.GetAllPosts();
  }

  GetAllPosts(){
    return this.postService.getPosts()
    .subscribe((results)=>{
      this.posts = results.json();
    })
  }

  onSelect(post){
    this.selectedPost = post;
    console.log(this.selectedPost);
  }
  onUpdatePost(){
    return this.postService.updatePost(this.selectedPost,this.selectedPost.post_id)
    .subscribe((result)=>{
      console.log(result.json());
      
    })
  }

  onToggleDeleteClick(){
    console.log('Delete Button Clicked');
    return this.postService.toggleDelete(this.selectedPost.post_id)
    .subscribe((result)=>{
      console.log(result.json().msg);
      if(result.json().msg == 'result updated'){
        this.selectedPost = null;
        this.GetAllPosts();
      }
    })
  }
}
