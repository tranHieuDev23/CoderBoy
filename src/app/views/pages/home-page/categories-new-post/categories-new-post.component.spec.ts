import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesNewPostComponent } from './categories-new-post.component';

describe('CategoriesNewPostComponent', () => {
  let component: CategoriesNewPostComponent;
  let fixture: ComponentFixture<CategoriesNewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesNewPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
