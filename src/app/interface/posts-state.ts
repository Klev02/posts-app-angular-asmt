import { ApiState } from './api-state';
import { Post } from './post';

export interface PostsState {
  posts: ApiState<Post[]>;
}
