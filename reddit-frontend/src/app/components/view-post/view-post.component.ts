import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../model/PostModel";
import {PostService} from "../../services/post/post.service";
import {ActivatedRoute} from "@angular/router";
import {throwError} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../services/comment/comment.service";
import {CommentModel} from "../../model/CommentModel";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  postId!: number;
  post!: PostModel
  commentForm!: FormGroup;
  commentRequest = {text: '', postId: 0};
  comments!: CommentModel[];


  constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private commentService: CommentService) {
    this.postId = this.activatedRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.commentRequest = {text: '', postId: this.postId};
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {
    // @ts-ignore
    this.commentRequest.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentRequest).subscribe(data => {
      this.commentForm.get('text')?.setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error)
    })
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    })
  }
}
