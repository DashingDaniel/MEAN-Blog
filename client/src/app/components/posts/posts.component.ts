import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/post';
import { NavbarService } from 'src/app/navbar.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  constructor(private postService: PostService, private nav: NavbarService) { }

  ngOnInit() {
    this.nav.show();
    this.onGetPosts();
    console.log(localStorage.getItem('token'))
  }

  onGetPosts(){
    return this.postService.getPosts()
    .subscribe((posts:Post[])=>{
      this.posts = posts
    })
  }

  onSearchClick(search_term){
    console.log(search_term);
  }

}
