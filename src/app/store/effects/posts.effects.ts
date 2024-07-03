import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchPosts,
  fetchPostsFailed,
  fetchPostsSucceeded,
} from '../actions/posts.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PostsService } from '../../services/posts.service';

@Injectable({
  providedIn: 'root',
})
export class PostsEffect {
  constructor(
    private actions$: Actions,
    private readonly postsService: PostsService
  ) {}

  fetchPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchPosts),
      switchMap(() => {
        return this.postsService
          .getPosts()
          .pipe(map((response) => fetchPostsSucceeded({ posts: response })));
      }),
      catchError((error) => {
        return of(fetchPostsFailed({ error }));
      })
    );
  });
}
