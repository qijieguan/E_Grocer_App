import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCatelogComponent } from './user-catelog.component';

describe('UserCatelogComponent', () => {
  let component: UserCatelogComponent;
  let fixture: ComponentFixture<UserCatelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCatelogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCatelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
