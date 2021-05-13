import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SubredditModel} from "../../model/SubredditModel";
import {Observable, of} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {Route, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.httpClient.get<Array<SubredditModel>>('http://localhost:8080/api/subreddit/getAll')
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    if(!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return of(new SubredditModel());
    }
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<SubredditModel>('http://localhost:8080/api/subreddit/create', subredditModel, httpOptions)
  }
}
