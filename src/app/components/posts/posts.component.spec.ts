import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of, take } from 'rxjs';
import { Post } from '../../interface/post';
import { fetchPosts } from '../../store/actions/posts.action';
import { selectPostsApiState } from '../../store/selectors/posts.selector';
import { PostsComponent } from './posts.component';
import { PostComponent } from '../post/post.component';
import { PostsState } from '../../interface/posts-state';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let store: MockStore;
  const initialState: PostsState = {
    posts: {
      data: [
        { id: 1, title: 'mock title 1', body: 'mock body 1', userId: 2 },
        { id: 2, title: 'mock title 2', body: 'mock body 2', userId: 2 },
      ],
      error: null,
      isLoading: false,
      hasLoaded: true,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsComponent, PostComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectPostsApiState, value: initialState.posts },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch fetchPosts action on init', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(fetchPosts());
  });

  it('should select posts from the store', (done) => {
    component.posts$.pipe(take(1)).subscribe({
      next: (posts) => {
        expect(posts?.length).toBe(2);
        expect(posts[0].title).toBe('mock title 1');
        expect(posts[1].title).toBe('mock title 2');
        done();
      },
    });
  });

  it('should set selected post', () => {
    const post: Post = initialState.posts.data[0];
    component.onSetSelectedPost(post);
    expect(component.selectedPost).toEqual(post);
  });
});
