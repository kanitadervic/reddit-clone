import { Component, OnInit } from '@angular/core';
import {SubredditModel} from "../../model/SubredditModel";
import {SubredditService} from "../../services/subreddit/subreddit.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.scss']
})
export class ListSubredditsComponent implements OnInit {

  subreddits!: Array<SubredditModel>;
  constructor(private subredditService: SubredditService) { }

  ngOnInit() {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    })
  }

}
