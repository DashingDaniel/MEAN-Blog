import { Injectable } from '@angular/core';
// import { Post } from './post';
import { Http } from '@angular/http';
// import { HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: Http) { }

  getPosts(){
    return this.http.get('http://localhost:3000/api/getAllPosts');
  }
  addPost(post_title: string, post_description: string,post_content: string, post_image: File){
    // Posts.push(post);
    const uploadData = new FormData();
    uploadData.append('post_image', post_image, post_image.name);
    uploadData.append('post_title', post_title);
    uploadData.append('post_description', post_description);
    uploadData.append('post_content', post_content);
    // console.log(reqBody);
    return this.http.post('http://localhost:3000/api/addNewPost', uploadData);
  }

  getPostById(id){
    console.log(id);
    return this.http.get(`http://localhost:3000/api/getPostById/${id}`);   
    // return this.http.get('http://localhost:3000/api/getPostById',id)
  }

  updatePost(post, id){
    console.log(id);
    return this.http.post(`http://localhost:3000/api/updatePost/${id}`, post);
  }

  toggleDelete(id){
    console.log(id);
    return this.http.get(`http://localhost:3000/api/toggleDelete/${id}`);
  }
}
