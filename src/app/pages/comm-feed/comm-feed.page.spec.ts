import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommFeedPage } from './comm-feed.page';

describe('CommFeedPage', () => {
  let component: CommFeedPage;
  let fixture: ComponentFixture<CommFeedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
