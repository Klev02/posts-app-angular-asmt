import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchPosts,
  fetchPostsFailed,
  fetchPostsSucceeded,
} from '../actions/posts.action';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsEffect {
  constructor(private actions$: Actions) {}

  fetchPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchPosts),
      switchMap(() => {
        return of([]).pipe(
          map((response) => fetchPostsSucceeded({ posts: response }))
        );
      }),
      catchError((error) => {
        return of(fetchPostsFailed({ error }));
      })
    );
  });
}
