import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Post } from '../../interface/post';
import { fetchPosts } from '../../store/actions/posts.action';
import { selectPostsApiState } from '../../store/selectors/posts.selector';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  selectedPost: Post | null = null;

  constructor(private store: Store) {
    this.posts$ = this.store
      .select(selectPostsApiState)
      .pipe(map((postsApiState) => postsApiState.data));
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPosts());
  }

  onSetSelectedPost(selectedPost: Post): void {
    this.selectedPost = selectedPost;
  }

  trackByFn(index: number, post: Post) {
    return post.id;
  }
}
