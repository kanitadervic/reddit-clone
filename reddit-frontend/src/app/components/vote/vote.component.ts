import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../model/PostModel";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  @Input() post!: PostModel;

  constructor() { }

  ngOnInit(): void {
  }

}
