import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PostComponent } from './post.component';
import { Post } from '../../interface/post';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let mockPost: Post;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    mockPost = {
      userId: 1,
      id: 1,
      title: 'mock title',
      body: 'mock body',
    };

    component.post = mockPost;
    fixture.detectChanges();
  });

  it('should display the title by default', () => {
    const postElement: HTMLElement = fixture.debugElement.query(
      By.css('.post-card')
    ).nativeElement;
    expect(postElement.textContent).toContain(mockPost.title);
  });

  it('should rotate through the properties on click', () => {
    component.onPostClick();

    expect(component.postContent).toEqual(mockPost.userId); // userId
  });

  it('should reset display content when isActive changes to false', () => {
    component.isActive = true;
    fixture.detectChanges();
    component.onPostClick();
    fixture.detectChanges();
    expect(component.postContent).toBe(1);

    component.isActive = false;
    fixture.detectChanges();
    expect(component.postContent).toBe(mockPost.title);
  });

  it('should emit the post when clicked', () => {
    const clickOnPOstEmitSPy = jest.spyOn(component.clickOnPost, 'emit');

    component.onPostClick();

    expect(clickOnPOstEmitSPy).toHaveBeenCalledWith(mockPost);
  });
});
