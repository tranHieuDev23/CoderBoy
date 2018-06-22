import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagListPageComponent } from './tag-list-page.component';

describe('TagListPageComponent', () => {
  let component: TagListPageComponent;
  let fixture: ComponentFixture<TagListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
