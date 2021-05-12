import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../model/PostModel";
import {PostService} from "../../services/post/post.service";
import {ActivatedRoute} from "@angular/router";
import {throwError} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  postId!: number;
  post!: PostModel
  commentForm!: FormGroup;
  // commentRequest!: CommentRequest

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {
    this.postId = this.activatedRoute.snapshot.params.id;
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    })
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  postComment() {

  }
}
