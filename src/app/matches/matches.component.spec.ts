import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesComponent } from './matches.component';

describe('MatchesComponent', () => {
  let component: MatchesComponent;
  let fixture: ComponentFixture<MatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchesComponent]
    });
    fixture = TestBed.createComponent(MatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
