import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VsaComponent } from './vsa.component';

describe('VsaComponent', () => {
  let component: VsaComponent;
  let fixture: ComponentFixture<VsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
