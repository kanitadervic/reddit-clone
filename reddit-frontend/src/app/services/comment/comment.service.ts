import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommentModel} from "../../model/CommentModel";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }

  postComment(commentRequest: any): Observable<Boolean> {
    if(!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return of(false);
    }
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<any>('http://localhost:8080/api/comment/create', commentRequest, httpOptions);
  }

  getAllCommentsForPost(postId: number) {
    return this.httpClient.get<CommentModel[]>('http://localhost:8080/api/comment/by-post/' + postId);
  }

  getAllCommentsByUser(name: string): Observable<Array<CommentModel>> {
    return this.httpClient.get<Array<CommentModel>>('http://localhost:8080/api/comment/by-user/' + name);
  }
}
