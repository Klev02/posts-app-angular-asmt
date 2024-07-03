import { createAction, props } from '@ngrx/store';
import { Post } from '../../interface/post';
import { HttpErrorResponse } from '@angular/common/http';

export const fetchPosts = createAction('[Posts] Fetch posts');
export const fetchPostsSucceeded = createAction(
  '[Posts] Posts loaded successfully',
  props<{ posts: Post[] }>()
);
export const fetchPostsFailed = createAction(
  '[Posts] Posts loaded successfully',
  props<{ error: HttpErrorResponse | null }>()
);
