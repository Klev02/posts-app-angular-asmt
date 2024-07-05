import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeConstant } from '../store.constant';
import { Post } from '../../interface/post';
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
