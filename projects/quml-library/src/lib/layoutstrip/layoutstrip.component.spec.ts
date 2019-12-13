import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutstripComponent } from './layoutstrip.component';

describe('LayoutstripComponent', () => {
  let component: LayoutstripComponent;
  let fixture: ComponentFixture<LayoutstripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutstripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutstripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
