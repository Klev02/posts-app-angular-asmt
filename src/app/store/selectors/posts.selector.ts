import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeConstant } from '../store.constant';
import { Post } from '../../interface/post';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiState } from '../../interface/api-state';
import { PostsState } from '../../interface/posts-state';

const selectPostsState = createSelector(
  createFeatureSelector(storeConstant.reducers.posts),
  (state: PostsState): PostsState => state
);

export const selectPostsApiState = createSelector(
  selectPostsState,
  (state: PostsState): ApiState<Post[]> => state.posts
);

export const selectActivePostId = createSelector(
  selectPostsState,
  (state: PostsState): number | null => state.activePostId
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
