import { createReducer, on } from '@ngrx/store';
import { fetchPostsFailed, fetchPostsSucceeded } from '../actions/posts.action';
import { postsInitialState } from '../states/posts-initial.state';

export const postsReducer = createReducer(
  postsInitialState,
  on(fetchPostsSucceeded, (state, { posts }) => ({
    ...state,
    posts: {
      data: posts,
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
      hasLoaded: true,
      error,
    },
  }))
);
