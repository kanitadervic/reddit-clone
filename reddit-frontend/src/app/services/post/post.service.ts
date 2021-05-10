import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "../../model/PostModel";
import {CreatePost} from "../../model/CreatePost";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/post/getAll');
  }

  createPost(createPost: CreatePost): Observable<any> {
    return this.httpClient.post<CreatePost>('http://localhost:8080/api/post/create', createPost);
  }
}
