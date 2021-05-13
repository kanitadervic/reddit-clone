import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {PostModel} from "../../model/PostModel";
import {CreatePost} from "../../model/CreatePost";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/post/getAll');
  }

  createPost(createPost: CreatePost): Observable<any> {
    if(!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return of(false);
    }
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<CreatePost>('http://localhost:8080/api/post/create', createPost, httpOptions);
  }

  getPost(postId: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>('http://localhost:8080/api/post/' + postId);
  }

  getAllPostsByUser(name: string): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/post/by-user/' + name);
  }
}
