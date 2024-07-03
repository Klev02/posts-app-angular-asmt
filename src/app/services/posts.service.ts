import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from '../interface/post';

@Injectable({ providedIn: 'root' })
export class PostsService {
  postApiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private readonly http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postApiUrl);
  }
}
