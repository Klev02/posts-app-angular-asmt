import { ApiState } from '../../interface/api-state';
import { Post } from '../../interface/post';

export interface PostsState {
  posts: ApiState<Post[]>;
}
