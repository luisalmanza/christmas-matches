import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveToastComponent } from './save-toast.component';

describe('SaveToastComponent', () => {
  let component: SaveToastComponent;
  let fixture: ComponentFixture<SaveToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveToastComponent]
    });
    fixture = TestBed.createComponent(SaveToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
