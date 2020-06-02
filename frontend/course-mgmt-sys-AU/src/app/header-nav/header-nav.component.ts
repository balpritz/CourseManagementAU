import { Component, OnInit } from '@angular/core';
import { AUTHENTICATED_USER, PASSWORD } from '../app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  searchString: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  handleLogout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(PASSWORD);
  }

  handleSearch() {
    this.router.navigate(['/search-results'], { queryParams: { query: this.searchString } });
  }

}
