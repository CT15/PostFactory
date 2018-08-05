import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsareaComponent } from './postsarea.component';

describe('PostsareaComponent', () => {
  let component: PostsareaComponent;
  let fixture: ComponentFixture<PostsareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
