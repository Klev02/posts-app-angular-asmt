import { PostsState } from '../../interface/posts-state';
import { Post } from '../../interface/post';
import { storeConstant } from '../store.constant';
import { selectPostsApiState } from './posts.selector';

describe('Posts Selectors', () => {
  const mockPosts: Post[] = [
    { id: 1, title: 'mock title 1', body: 'mock body 1', userId: 2 },
    { id: 2, title: 'mock title 2', body: 'mock body 2', userId: 2 },
  ];

  const initialPostsState: PostsState = {
    posts: {
      data: mockPosts,
      error: null,
      isLoading: false,
      hasLoaded: true,
    },
  };

  describe('selectPostsApiState', () => {
    it('should select the posts API state', () => {
      const result = selectPostsApiState.projector(initialPostsState);
      expect(result).toEqual(initialPostsState.posts);
    });
  });
});
