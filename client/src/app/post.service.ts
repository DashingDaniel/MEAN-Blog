// one such important file that contains all the centralized code for reusablity and almost all the http requests are handled by this file
import { Injectable } from '@angular/core';
import {  HttpHeaders,HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  tags = [
    {type: 'Personal', id: 1, selected: false},
    {type: 'Profesional', id: 2, selected: false},
    {type: 'Niche', id: 3, selected: false},  
    {type: 'Freellance', id: 4, selected: false},  
    {type: 'Media', id: 5, selected: false},  
    {type: 'News', id: 6, selected: false},  
    {type: 'Affiliate', id: 7, selected: false},  
    {type: 'Marketting', id: 8, selected: false}
  ]
  constructor(private http: HttpClient) { }
  // no proxy is used so it's important to add a root url before the /api, Everything returns a subscribable promise so that we can store or manipulate the data anywhere in our whole application
  getPosts(){
    return this.http.get('http://localhost:3000/api/getAllPosts');
  }
  addPost(post_title: string, post_description: string,post_content: string, post_image: File, post_catagory: string){
    // Posts.push(post);
    const httpOptions = new HttpHeaders({      
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
    console.log(httpOptions);
    const uploadData = new FormData();
    uploadData.append('post_image', post_image, post_image.name);
    uploadData.append('post_title', post_title);
    uploadData.append('post_description', post_description);
    uploadData.append('post_content', post_content);
    uploadData.append('post_catagory', post_catagory);
    // console.log(reqBody);
    return this.http.post('http://localhost:3000/api/addNewPost', uploadData,{headers: httpOptions});
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

  searchPostsByTitle(search_term){
    console.log(search_term);
    return this.http.get(`http://localhost:3000/api/searchLikeTitle/${search_term}`);
  }

  getUserPosts(){
    const httpOptions = new HttpHeaders({      
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get('http://localhost:3000/api/getUserPosts',{headers:httpOptions});
  }

  addNewComment(post_id,comment_data){
    const httpOptions = new HttpHeaders({      
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // httpOptions.set('Content-Type', 'application/json');
    const uploadData = new FormData();
    uploadData.append('comment_data', comment_data );
    console.log(comment_data);
    return this.http.post(`http://localhost:3000/api/addNewComment/${post_id}`,uploadData,{headers: httpOptions});
  }

  getCommentDetails(post_id){
    return this.http.get(`http://localhost:3000/api/getPostComments/${post_id}`)
  }

  getUserComments(){
    const httpOptions = new HttpHeaders({      
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get('http://localhost:3000/api/getUserComments',{headers: httpOptions});
  }

  updateComment(comment_data,comment_id){
    const httpOptions = new HttpHeaders({      
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const uploadData = new FormData();
    uploadData.append('comment_data', comment_data);
    console.log('data: ',comment_data);
    console.log('id: ',comment_id);
    return this.http.post(`http://localhost:3000/api/updateComment/${comment_id}`,uploadData,{headers: httpOptions});

  }

  toggleCommentDelete(comment_id){
    return this.http.get(`http://localhost:3000/api/toggleDeleteComment/${comment_id}`);
  }

  getAllUsers(){
    return this.http.get('http://localhost:3000/api/getAllUsers')
  }

  getPostsWithUserID(id){
    return this.http.get(`http://localhost:3000/api//getAllUsers/${id}`);
  }
}
