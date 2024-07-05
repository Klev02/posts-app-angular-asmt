import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreModule, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectPostsApiState } from './store/selectors/posts.selector';
import { fetchPosts } from './store/actions/posts.action';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  const initialState = {
    /* define your initial state here */
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, PostsComponent],
      imports: [AppComponent],
      providers: [
        provideMockStore(), // Provide initial store state
        RouterOutlet, // Mock RouterOutlet if necessary
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
