import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Post } from './interface/post';
import { selectPostsApiState } from './store/selectors/posts.selector';
import { fetchPosts } from './store/actions/posts.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'posts-app-angular-asmt';
  posts$: Observable<Post[]>;

  constructor(private store: Store) {
    this.posts$ = this.store
      .select(selectPostsApiState)
      .pipe(map((postsApiState) => postsApiState.data));
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPosts());
  }
}
