import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {VoteModel} from "../../model/VoteModel";
import {SubredditModel} from "../../model/SubredditModel";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  vote(vote: VoteModel): Observable<any> {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<SubredditModel>('http://localhost:8080/api/vote/create', vote, httpOptions)
  }
}
