import { Component, OnInit } from '@angular/core';
import { AUTHENTICATED_USER, PASSWORD, CREATOR_ID } from '../app.constants';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  handleLogout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(PASSWORD);
    sessionStorage.removeItem(CREATOR_ID);
  }
}
