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
    posts: {
      data: [],
      isLoading: true,
      error: null,
      hasLoaded: false,
    },
  })),
  on(fetchPostsSucceeded, (state, payload) => ({
    ...state,
    posts: {
      data: payload.posts,
      isLoading: false,
      hasLoaded: true,
      error: null,
    },
  })),
  on(fetchPostsFailed, (state, { error }) => ({
    ...state,
    posts: {
      data: [],
      isLoading: false,
      error,
      hasLoaded: true,
    },
  }))
);
