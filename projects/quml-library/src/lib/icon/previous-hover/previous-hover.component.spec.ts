import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousHoverComponent } from './previous-hover.component';

describe('PreviousHoverComponent', () => {
  let component: PreviousHoverComponent;
  let fixture: ComponentFixture<PreviousHoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousHoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
