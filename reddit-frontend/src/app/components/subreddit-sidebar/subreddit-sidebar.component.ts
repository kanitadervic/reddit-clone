import { Component, OnInit } from '@angular/core';
import {SubredditModel} from "../../model/SubredditModel";
import {SubredditService} from "../../services/subreddit/subreddit.service";

@Component({
  selector: 'app-subreddit-sidebar',
  templateUrl: './subreddit-sidebar.component.html',
  styleUrls: ['./subreddit-sidebar.component.scss']
})
export class SubredditSidebarComponent implements OnInit {

  allSubreddits: Array<SubredditModel> = [];
  displayViewAll!: boolean;

  constructor(private subredditService: SubredditService) {
    this.subredditService.getAllSubreddits().subscribe(data => {
      console.log(data)
      if(data.length >= 4) {
        this.allSubreddits = data.splice(0 , 3);
        this.displayViewAll = true;
      } else {
        this.allSubreddits = data;
      }
    })
  }

  ngOnInit(): void {
  }

}
