import { HttpErrorResponse } from '@angular/common/http';

export interface ApiState<T> {
  data: T;
  isLoading: boolean;
  error: HttpErrorResponse | null;
  hasLoaded: boolean;
}
