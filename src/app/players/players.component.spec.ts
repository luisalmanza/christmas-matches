import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersComponent } from './players.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../shared/components/loading/loading.component';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersComponent, LoadingComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
