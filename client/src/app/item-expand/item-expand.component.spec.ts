import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemExpandComponent } from './item-expand.component';

describe('ItemExpandComponent', () => {
  let component: ItemExpandComponent;
  let fixture: ComponentFixture<ItemExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemExpandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
