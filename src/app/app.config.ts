import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { postsReducer } from './store/reducer/posts.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { storeConstant } from './store/store.constant';
import { provideEffects } from '@ngrx/effects';
import { PostsEffect } from './store/effects/posts.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ [storeConstant.reducers.posts]: postsReducer }),
    provideEffects([PostsEffect]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideHttpClient(),
  ],
};
