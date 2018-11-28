import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-deleted-items',
  templateUrl: './deleted-items.component.html',
  styleUrls: ['./deleted-items.component.css']
})
export class DeletedItemsComponent implements OnInit {
  posts: Post[]
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.GetAllPosts();
  }

  GetAllPosts(){
    return this.postService.getPosts()
    .subscribe((results)=>{
      this.posts = results.json();
    })
  }
  onToggleDelete(post){
    return this.postService.toggleDelete(post.post_id)
    .subscribe((result)=>{
      console.log(result.json().msg);
      if(result.json().msg == 'result updated'){
        this.GetAllPosts();
      }
    })
  }
}
