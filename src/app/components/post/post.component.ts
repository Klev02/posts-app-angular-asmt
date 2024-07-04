import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Post } from '../../interface/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnChanges {
  @Input({ required: true })
  post!: Post;
  @Input() isActive: boolean = false;
  @Output() clickOnPost: EventEmitter<Post> = new EventEmitter<Post>();

  postContent: any;

  private postProperties!: string[];
  private currentPopertyIndex!: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      this.postProperties = Object.keys(this.post);
      this.setToDefault();
    } else if (changes['isActive'] && !this.isActive) {
      this.setToDefault();
    }
  }

  onPostClick(): void {
    this.showNextPostProperty();
    this.clickOnPost.emit(this.post);
  }

  private showNextPostProperty(): void {
    this.currentPopertyIndex =
      (this.currentPopertyIndex + 1) % this.postProperties.length;
    this.postContent =
      this.post[this.postProperties[this.currentPopertyIndex] as keyof Post];
  }

  private setToDefault(): void {
    this.postContent = this.post.title;
    this.currentPopertyIndex = 0;
  }
}
