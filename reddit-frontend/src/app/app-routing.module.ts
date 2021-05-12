import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {CreatePostComponent} from "./components/create-post/create-post.component";
import {CreateSubredditComponent} from "./components/create-subreddit/create-subreddit.component";
import {ListSubredditsComponent} from "./components/list-subreddits/list-subreddits.component";
import {ViewPostComponent} from "./components/view-post/view-post.component";

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'create-subreddit', component: CreateSubredditComponent},
  {path: 'list-subreddits', component: ListSubredditsComponent},
  {path: 'view-post/:id', component: ViewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
