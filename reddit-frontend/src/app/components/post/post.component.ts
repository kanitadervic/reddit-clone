import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post/post.service";
import {PostModel} from "../../model/PostModel";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    })
  }

  ngOnInit(): void {
  }

}
