import { createReducer, on } from '@ngrx/store';
import {
  fetchPosts,
  fetchPostsFailed,
  fetchPostsSucceeded,
} from '../actions/posts.action';
import { postsInitialState } from '../states/posts-initial.state';

export const postsReducer = createReducer(
  postsInitialState,
  on(fetchPosts, (state) => ({
    ...state,
    data: [],
    isLoading: true,
    error: null,
    hasLoaded: false,
  })),
  on(fetchPostsSucceeded, (_, payload) => ({
    data: payload.posts,
    isLoading: false,
    hasLoaded: true,
    error: null,
  })),
  on(fetchPostsFailed, (state, { error }) => ({
    ...state,
    data: [],
    isLoading: false,
    error,
    hasLoaded: true,
  }))
);
