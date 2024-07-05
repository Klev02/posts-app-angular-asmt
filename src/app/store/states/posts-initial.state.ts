import { ApiState } from '../../interface/api-state';
import { Post } from '../../interface/post';
import { PostsState } from '../../interface/posts-state';

export const postsInitialState: PostsState = {
  posts: {
    data: [],
    isLoading: false,
    error: null,
    hasLoaded: false,
  },
};
