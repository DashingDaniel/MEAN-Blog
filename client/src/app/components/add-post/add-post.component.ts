import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import {Router} from "@angular/router";
import { NavbarService } from 'src/app/navbar.service';

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
  constructor(private postService: PostService, private router: Router, private nav: NavbarService) { }

  ngOnInit() {
    this.nav.show();
    if(localStorage.getItem('token')==null){
      this.router.navigate([""])
    }
  }

// during the change of image path we have to make sure to store that in the variable that has a file format datatype
  onImageChanged(event){
    console.log(event.target.files[0]);
    this.post_image = event.target.files[0];
  }

  // Small validation just to make sure that the user fills all the necessary inputs and then submits the form
  onAddNewPost(){
    if(this.post_title == undefined || this.post_description == undefined ||this.post_content == undefined ||this.post_image == undefined ){
      alert('Please fill everything')
    }else{
    // console.log(this.post_title, this.post_description);
    // console.log(event.target);
    // this.post_image = event.target.files[0];
    this.postService.addPost(this.post_title, this.post_description,this.post_content, this.post_image)
    .subscribe((result:any)=>{
      console.log(result.msg);
      if(result.msg == 'New Post Added'){
        // when the post gets added we are navigating the user to the home route
        this.router.navigate(["home"]);
      }
    })
    }
  }

}
