import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/post';
import { NavbarService } from 'src/app/navbar.service';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  commentFormVisible: boolean = false;
  comment_data: string;
  commentSectionVisible: boolean = false;
  commentResults: [];
  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private postService: PostService, private nav: NavbarService) { }

  ngOnInit() {
    this.getPostById();
    this.nav.show();
  }

  getPostById(){
    const id  = +this.route.snapshot.paramMap.get('id');
    // console.log(id)
    this.postService.getPostById(id)
    .subscribe((post:Post)=>{
      console.log(post);
      this.post = post;
      this.post = this.post[0];
      console.log(this.post.post_title)
    })
  }

  onAddCommentToggle(){
    if(localStorage.getItem('token')==undefined){
      this.router.navigate([""]);
    }
    this.commentFormVisible = !this.commentFormVisible;
  }
  onShowComment(){
    let id  = +this.route.snapshot.paramMap.get('id')
    this.commentSectionVisible = true;
    this.postService.getCommentDetails(id)
    .subscribe((results:[])=>{
      console.log(results);
      this.commentResults = results;
    })
  }

  addNewComment(){
    if(localStorage.getItem('token')==undefined){
      this.router.navigate([""]);
    }
    const id  = +this.route.snapshot.paramMap.get('id')
    this.postService.addNewComment(id, this.comment_data)
    .subscribe((result:any)=>{
      if(result.msg == 'Comment added successfully'){
        this.commentFormVisible = false;
      }
    })
  }

}