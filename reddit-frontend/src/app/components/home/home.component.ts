import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../model/PostModel.model";
import {PostService} from "../../services/post/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
    })
  }

  ngOnInit(): void {
  }

}
