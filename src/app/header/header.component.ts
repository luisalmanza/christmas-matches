import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navbar: bootstrap.Offcanvas | undefined;
  route: string = "";

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route = event.url;
      }
    });
  }

  ngOnInit() {
    this.navbar = new bootstrap.Offcanvas("#offcanvasDarkNavbar");
  }
}
