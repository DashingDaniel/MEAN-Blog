import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post.service';
import { NavbarService } from 'src/app/navbar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  search_term: string;
  logoutVisible: boolean;
  // @Output() search_click = new EventEmitter();
  constructor(private router: Router, private postService: PostService, private nav: NavbarService) { }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.logoutVisible = true;
    }else{
      this.logoutVisible = false;
    }
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate([""])
  }

}
