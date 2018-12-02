import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/post';
import { NavbarService } from 'src/app/navbar.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  results: Post[];
  constructor(private route: ActivatedRoute, private postService: PostService,
    private nav: NavbarService) { }

  ngOnInit() {
    this.nav.show();
    this.getPostBySearchTerm()
  }
  getPostBySearchTerm(){
    const search_term  = this.route.snapshot.paramMap.get('search_term');
    console.log(search_term);
    this.postService.searchPostsByTitle(search_term)
    .subscribe((results: any)=>{
      console.log(results.msg);
      if(results.msg == 'No records found'){
        this.results = null;
      }else{
        this.results = results;
      }
    })
  }
}
