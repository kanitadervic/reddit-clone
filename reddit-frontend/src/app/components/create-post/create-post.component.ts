import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePost} from "../../model/CreatePost";
import {SubredditModel} from "../../model/SubredditModel";
import {Route, Router} from "@angular/router";
import {PostService} from "../../services/post/post.service";
import {SubredditService} from "../../services/subreddit/subreddit.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;
  postRequest!: CreatePost;
  subreddits!: Array<SubredditModel>;

  constructor(private router: Router, private postService: PostService, private subredditService: SubredditService) {
    this.postRequest = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    }
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error)
    })
  }

  createPost() {
    // @ts-ignore
    this.postRequest.postName = this.createPostForm.get('postName').value;
    // @ts-ignore
    this.postRequest.subredditName = this.createPostForm.get('subredditName').value;
    // @ts-ignore
    this.postRequest.url = this.createPostForm.get('url').value;
    // @ts-ignore
    this.postRequest.description = this.createPostForm.get('description').value;


    this.postService.createPost(this.postRequest).subscribe((data) => {
      this.router.navigateByUrl('/')
    }, error => {
      throwError(error)
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}
