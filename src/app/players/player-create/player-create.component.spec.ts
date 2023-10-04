import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { PlayerCreateComponent } from './player-create.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

describe('PlayerCreateComponent', () => {
  let component: PlayerCreateComponent;
  let fixture: ComponentFixture<PlayerCreateComponent>;

  const activatedRouteMock = {
    paramMap: of({ get: (param: string) => "playerId" })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerCreateComponent, LoadingComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock 
        }
      ],
      imports: [HttpClientModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(PlayerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
