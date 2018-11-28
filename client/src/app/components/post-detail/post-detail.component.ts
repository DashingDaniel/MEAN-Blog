import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/post';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  constructor(private route: ActivatedRoute, private location: Location, private postService: PostService) { }

  ngOnInit() {
    this.getPostById();
  }

  getPostById(){
    const id  = +this.route.snapshot.paramMap.get('id');
    // console.log(id)
    this.postService.getPostById(id)
    .subscribe((post)=>{
      console.log(post.json());
      this.post = post.json();
      this.post = this.post[0];
      console.log(this.post.post_title)
    })
  }

}