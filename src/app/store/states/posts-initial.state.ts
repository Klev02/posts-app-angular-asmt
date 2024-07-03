import { ApiState } from '../../interface/api-state';
import { Post } from '../../interface/post';

export const postsInitialState: ApiState<Post[]> = {
  data: [],
  isLoading: false,
  error: null,
  hasLoaded: false,
};
