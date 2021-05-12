import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../services/post/post.service";
import {PostModel} from "../../model/PostModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() posts!: PostModel[];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToPost(id: number) {
    this.router.navigateByUrl('/view-post/' + id)
  }
}
