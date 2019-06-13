import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRequestContentComponent } from './submit-request-content.component';

describe('SubmitRequestContentComponent', () => {
  let component: SubmitRequestContentComponent;
  let fixture: ComponentFixture<SubmitRequestContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRequestContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitRequestContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
