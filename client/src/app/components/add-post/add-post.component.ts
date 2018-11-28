import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  post_title: string;
  post_description: string;
  post_image: File;
  post_content: string;
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
  }
  onImageChanged(event){
    console.log(event.target.files[0]);
    this.post_image = event.target.files[0];
  }
  onAddNewPost(){
    if(this.post_title == undefined || this.post_description == undefined ||this.post_content == undefined ||this.post_image == undefined ){
      alert('Please fill everything')
    }else{
    // console.log(this.post_title, this.post_description);
    // console.log(event.target);
    // this.post_image = event.target.files[0];
    this.postService.addPost(this.post_title, this.post_description,this.post_content, this.post_image)
    .subscribe((result)=>{
      console.log(result.json().msg);
      if(result.json().msg == 'New Post Added'){
        this.router.navigate([""]);
      }
    })
    }
  }

}
