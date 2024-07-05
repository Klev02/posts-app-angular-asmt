import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { Post } from '../../interface/post';
import { EventEmitter } from '@angular/core';
import { SimpleChanges } from '@angular/core';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  const mockPost: Post = {
    id: 1,
    title: 'mock title 1',
    body: 'mock body 1',
    userId: 2,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = mockPost;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize postKeys', () => {
    component.ngOnInit();
    expect(component.postKeys).toEqual(['id', 'title', 'body', 'userId']);
  });

  it('should set "title" as currentPostKeyIndex on ngOnInit', () => {
    component.ngOnInit();
    expect(component['currentPostKeyIndex']).toBe(1);
  });

  it('should set currentPostKeyIndex to default on isActive change to false', () => {
    const changes: SimpleChanges = {
      isActive: {
        previousValue: true,
        currentValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.onPostClick(1);

    expect(component['currentPostKeyIndex']).not.toBe(1);

    component.ngOnChanges(changes);

    expect(component['currentPostKeyIndex']).toBe(1);
  });

  it('should emit clickOnPost event on onPostClick', () => {
    const emitSpy = jest.spyOn(component.clickOnPost, 'emit');

    component.onPostClick(1);

    expect(emitSpy).toHaveBeenCalledWith(mockPost);
  });

  it('should change currentPostKeyIndex on onPostClick if index matches', () => {
    component.onPostClick(1);

    expect(component['currentPostKeyIndex']).toBe(2);
  });

  it('should identify current card correctly', () => {
    component.ngOnInit();

    expect(component.isCurrentCard(1)).toBe(true);
    expect(component.isCurrentCard(0)).toBe(false);
  });
});
