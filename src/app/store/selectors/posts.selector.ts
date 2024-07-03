import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeConstant } from '../store.constant';
import { PostsState } from '../states/posts.state';
import { Post } from '../../interface/post';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiState } from '../../interface/api-state';

const selectPostsApiState = createSelector(
  createFeatureSelector(storeConstant.reducers.posts),
  (state: PostsState): ApiState<Post[]> => state.posts
);

export const selectPosts = createSelector(
  selectPostsApiState,
  (state: ApiState<Post[]>): Post[] => state.data
);

export const selectPostsLoading = createSelector(
  selectPostsApiState,
  (state: ApiState<Post[]>): boolean => state.isLoading
);

export const selectPostsError = createSelector(
  selectPostsApiState,
  (state: ApiState<Post[]>): HttpErrorResponse | null => state.error
);
