import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../model/PostModel";
import {VoteService} from "../../services/vote/vote.service";
import {AuthService} from "../../services/auth/auth.service";
import {PostService} from "../../services/post/post.service";
import {ToastrService} from "ngx-toastr";
import {VoteModel} from "../../model/VoteModel";
import {VoteType} from "../../model/VoteType";
import {throwError} from "rxjs";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  @Input() post!: PostModel;
  voteRequest!: VoteModel;
  upvoteColor!: string;
  downvoteColor!: string;

  constructor(private voteService: VoteService, private authService: AuthService, private postService: PostService, private toastr: ToastrService) {
    this.voteRequest = {
      voteType: undefined,
      postId: undefined
    }
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  downvotePost() {
    this.voteRequest.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  upvotePost() {
    this.voteRequest.voteType = VoteType.UPVOTE;
    this.vote();
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    })

  }

  private vote() {
    this.voteRequest.postId = this.post.id;
    this.voteService.vote(this.voteRequest).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.message)
      throwError(error)
    })
  }
}
