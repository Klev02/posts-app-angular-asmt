import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, take, throwError } from 'rxjs';
import { PostsEffect } from './posts.effect';
import { PostsService } from '../../services/posts.service';
import {
  fetchPosts,
  fetchPostsFailed,
  fetchPostsSucceeded,
} from '../actions/posts.action';
import { Post } from '../../interface/post';
import { HttpErrorResponse } from '@angular/common/http';

describe('PostsEffect', () => {
  let actions$: Observable<any>;
  let effects: PostsEffect;
  let postsService: PostsService;

  const mockPosts: Post[] = [
    { userId: 1, id: 1, title: 'Test Post 1', body: 'Test Body 1' },
    { userId: 2, id: 2, title: 'Test Post 2', body: 'Test Body 2' },
  ];

  beforeEach(() => {
    const postsServiceMock = {
      getPosts: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        PostsEffect,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: PostsService, useValue: postsServiceMock },
      ],
    });

    effects = TestBed.inject(PostsEffect);
    postsService = TestBed.inject(PostsService);
  });

  describe('fetchPosts', () => {
    let getPostsSpy: jest.SpyInstance;

    beforeEach(() => {
      getPostsSpy = jest.spyOn(postsService, 'getPosts');
      const action = fetchPosts();
      actions$ = of(action);
    });

    it('should dispatch fetchPostsSucceeded when successful', (done) => {
      const successAction = fetchPostsSucceeded({ posts: mockPosts });

      getPostsSpy.mockReturnValue(of(mockPosts));

      effects.fetchPosts$.pipe(take(1)).subscribe((result) => {
        expect(result).toEqual(successAction);
        done();
      });
    });

    it('should dispatch fetchPostsFailed when fails', (done) => {
      const error = new HttpErrorResponse({ error: 'Error fetching posts' });
      const failAction = fetchPostsFailed({ error });

      getPostsSpy.mockReturnValue(throwError(() => error));

      effects.fetchPosts$.pipe(take(1)).subscribe((result) => {
        expect(result).toEqual(failAction);
        done();
      });
    });
  });
});
