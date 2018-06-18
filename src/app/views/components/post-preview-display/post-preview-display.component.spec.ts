import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPreviewDisplayComponent } from './post-preview-display.component';

describe('PostPreviewDisplayComponent', () => {
  let component: PostPreviewDisplayComponent;
  let fixture: ComponentFixture<PostPreviewDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPreviewDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPreviewDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
