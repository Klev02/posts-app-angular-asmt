import { postsReducer } from './posts.reducer';
import { postsInitialState } from '../states/posts-initial.state';
import {
  fetchPosts,
  fetchPostsFailed,
  fetchPostsSucceeded,
} from '../actions/posts.action';
import { Post } from '../../interface/post';
import { HttpErrorResponse } from '@angular/common/http';

describe('Posts Reducer', () => {
  const mockPosts: Post[] = [
    { id: 1, title: 'mock title 1', body: 'mock body 1', userId: 2 },
    { id: 2, title: 'mock title 2', body: 'mock body 2', userId: 2 },
  ];

  it('should handle fetchPosts action', () => {
    const action = fetchPosts();
    const state = postsReducer(postsInitialState, action);
    expect(state.posts).toEqual({
      isLoading: true,
      data: [],
      error: null,
      hasLoaded: false,
    });
  });

  it('should handle fetchPostsSucceeded action', () => {
    const action = fetchPostsSucceeded({ posts: mockPosts });
    const state = postsReducer(postsInitialState, action);
    expect(state.posts).toEqual({
      isLoading: false,
      data: mockPosts,
      error: null,
      hasLoaded: true,
    });
  });

  it('should handle fetchPostsFailed action', () => {
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: 'Error fetching posts',
    });
    const action = fetchPostsFailed({ error });
    const state = postsReducer(postsInitialState, action);
    expect(state.posts).toEqual({
      isLoading: false,
      data: [],
      error: error,
      hasLoaded: true,
    });
  });
});
