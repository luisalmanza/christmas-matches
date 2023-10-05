import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  const navigationSubject: Subject<NavigationEnd> = new Subject<NavigationEnd>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            events: navigationSubject.asObservable()
          }
        }
      ]
    });

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update route property on navigation', () => {
    expect(component.route).toBe("");

    const navigationEvent: NavigationEnd = new NavigationEnd(0, "players", "");
    navigationSubject.next(navigationEvent);

    expect(component.route).toBe("players");
  });
});
