import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantListComponent } from './participant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { FormsModule } from '@angular/forms';

describe('ParticipantListComponent', () => {
  let component: ParticipantListComponent;
  let fixture: ComponentFixture<ParticipantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ 
        ParticipantListComponent,
        HeaderNavComponent, 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
