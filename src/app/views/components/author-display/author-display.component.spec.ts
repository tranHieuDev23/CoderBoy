import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDisplayComponent } from './author-display.component';

describe('AuthorDisplayComponent', () => {
  let component: AuthorDisplayComponent;
  let fixture: ComponentFixture<AuthorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
