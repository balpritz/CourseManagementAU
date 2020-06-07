import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchResultsComponent } from './search-results.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { FormsModule } from '@angular/forms';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
      ],
      declarations: [ 
        SearchResultsComponent,
        HeaderNavComponent, 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
