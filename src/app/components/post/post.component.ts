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
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit, OnChanges {
  @Input({ required: true })
  post!: Post;
  @Input() isActive: boolean = false;
  @Output() clickOnPost: EventEmitter<Post> = new EventEmitter<Post>();

  postKeys: (keyof Post)[] = [];

  private currentPostKeyIndex!: number;

  ngOnInit(): void {
    this.postKeys = Object.keys(this.post) as (keyof Post)[];
    this.setToDefault();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isActive'] &&
      !changes['isActive'].isFirstChange() &&
      !this.isActive
    ) {
      this.setToDefault();
    }
  }

  onPostClick(index: number): void {
    if (this.currentPostKeyIndex === index) {
      this.currentPostKeyIndex =
        (this.currentPostKeyIndex + 1) % this.postKeys.length;
    }

    this.clickOnPost.emit(this.post);
  }

  isCurrentCard(index: number): boolean {
    return this.currentPostKeyIndex === index;
  }

  private setToDefault(): void {
    this.currentPostKeyIndex = this.postKeys.indexOf('title');
  }
}
