import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPostItemComponent } from './carousel-post-item.component';

describe('CarouselPostItemComponent', () => {
  let component: CarouselPostItemComponent;
  let fixture: ComponentFixture<CarouselPostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselPostItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
