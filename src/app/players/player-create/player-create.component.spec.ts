import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCreateComponent } from './player-create.component';

describe('PlayerCreateComponent', () => {
  let component: PlayerCreateComponent;
  let fixture: ComponentFixture<PlayerCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerCreateComponent]
    });
    fixture = TestBed.createComponent(PlayerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
