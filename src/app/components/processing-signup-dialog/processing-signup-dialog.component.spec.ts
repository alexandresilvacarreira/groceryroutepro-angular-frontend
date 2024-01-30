import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingSignupDialogComponent } from './processing-signup-dialog.component';

describe('ProcessingSignupDialogComponent', () => {
  let component: ProcessingSignupDialogComponent;
  let fixture: ComponentFixture<ProcessingSignupDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessingSignupDialogComponent]
    });
    fixture = TestBed.createComponent(ProcessingSignupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
