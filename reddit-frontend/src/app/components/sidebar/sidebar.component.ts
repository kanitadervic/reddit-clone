import { Component, OnInit } from '@angular/core';
import {SubredditService} from "../../services/subreddit/subreddit.service";
import {PostModel} from "../../model/PostModel";
import {SubredditModel} from "../../model/SubredditModel";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  ngOnInit(): void {
  }

}
