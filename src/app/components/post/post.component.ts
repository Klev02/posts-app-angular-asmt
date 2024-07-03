import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../interface/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input()
  post!: Post;
}
