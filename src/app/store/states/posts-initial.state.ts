import { PostsState } from './posts.state';

export const postsInitialState: PostsState = {
  posts: {
    data: [],
    isLoading: false,
    error: null,
    hasLoaded: false,
  },
};
