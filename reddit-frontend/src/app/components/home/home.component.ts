import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../model/PostModel";
import {PostService} from "../../services/post/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }

}
