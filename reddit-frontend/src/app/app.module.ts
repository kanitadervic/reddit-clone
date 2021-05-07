import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import {MaterialModule} from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";
import {LoginComponent} from "./components/login/login.component";
import {ToastrModule} from "ngx-toastr";
import { HomeComponent } from './components/home/home.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { PostComponent } from './components/post/post.component';
import { VoteComponent } from './components/vote/vote.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SubredditSidebarComponent } from './components/subreddit-sidebar/subreddit-sidebar.component';
import { CreateSubredditComponent} from "./components/create-subreddit/create-subreddit.component";
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ListSubredditsComponent } from './components/list-subreddits/list-subreddits.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    VoteComponent,
    SidebarComponent,
    SubredditSidebarComponent,
    CreateSubredditComponent,
    CreatePostComponent,
    ListSubredditsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
