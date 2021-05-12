import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "../../model/PostModel";
import {CreatePost} from "../../model/CreatePost";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/post/getAll');
  }

  createPost(createPost: CreatePost): Observable<any> {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<CreatePost>('http://localhost:8080/api/post/create', createPost, httpOptions);
  }
}
