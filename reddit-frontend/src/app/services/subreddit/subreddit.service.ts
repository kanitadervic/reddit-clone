import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SubredditModel} from "../../model/SubredditModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private httpClient: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.httpClient.get<Array<SubredditModel>>('http://localhost:8080/api/subreddit/getAll')
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.httpClient.post<SubredditModel>('http://localhost:8080/api/subreddit/create', subredditModel)
  }
}
