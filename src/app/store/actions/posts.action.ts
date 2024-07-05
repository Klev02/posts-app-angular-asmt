import { createAction, props } from '@ngrx/store';
import { Post } from '../../interface/post';
import { HttpErrorResponse } from '@angular/common/http';

export const fetchPosts = createAction('[Posts] FETCH POSTS');

export const fetchPostsSucceeded = createAction(
  '[Posts] FETCH POSTS SUCCESS',
  props<{ posts: Post[] }>()
);

export const fetchPostsFailed = createAction(
  '[Posts] FETCH POSTS FAIL',
  props<{ error: HttpErrorResponse | null }>()
);
