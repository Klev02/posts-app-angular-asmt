import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { Post } from '../interface/post';
import { take } from 'rxjs';

describe('PostsService', () => {
  let service: PostsService;
  let httpTestingController: HttpTestingController;

  const mockPosts: Post[] = [
    { userId: 1, id: 1, title: 'Test Post 1', body: 'Test Body 1' },
    { userId: 2, id: 2, title: 'Test Post 2', body: 'Test Body 2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });

    service = TestBed.inject(PostsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve posts from the API via GET', (done) => {
    service
      .getPosts()
      .pipe(take(1))
      .subscribe((posts) => {
        expect(posts).toEqual(mockPosts);
        done();
      });

    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts'
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockPosts);
  });
});
