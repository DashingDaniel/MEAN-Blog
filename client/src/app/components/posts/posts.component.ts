import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/post';
import { NavbarService } from 'src/app/navbar.service';
import { _ } from 'underscore';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  users: [];
  dates:any[] = [];
  tags: any[] = [];
  constructor(private postService: PostService, private nav: NavbarService) { }

  ngOnInit() {
    this.tags = this.postService.tags;
    this.nav.show();
    this.onGetPosts();
    this.getAllUsers();
    this.getDates();
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

  getAllUsers(){
    return this.postService.getAllUsers()
    .subscribe((result:[])=>{
      this.users = result;
    })
  }

  searchPostsWithUser(id){
    return this.postService.getPostsWithUserID(id)
    .subscribe((results:Post[])=>{
      this.posts = results;
    })
  }

  getDates(){
    this.postService.getPosts()
    .subscribe((results: Post[])=>{
      this.posts = results;
      this.posts.forEach((post)=>{
        if (this.dates.includes(post.post_time.split('T')[0]) === false) this.dates.push(post.post_time.split('T')[0]);
        // this.dates.push(post.post_time.split('T')[0]);
      })
    })
    
    console.log(this.dates);
  }

  getPostsByDates(date){
    this.postService.getPosts()
    .subscribe((results: Post[])=>{
      this.posts = results;
      this.posts = this.posts.filter(post => post.post_time.includes(date));
      console.log(this.posts)
    })
    
  }
  getPostsByTag(type){
    this.postService.getPosts()
    .subscribe((results: Post[])=>{
      this.posts = results;
      this.posts = this.posts.filter(post => post.post_catagory.includes(type));
      console.log(this.posts)
  })
}
}