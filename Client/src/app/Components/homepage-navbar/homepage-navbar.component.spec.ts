import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageNavbarComponent } from './homepage-navbar.component';

describe('HomepageNavbarComponent', () => {
  let component: HomepageNavbarComponent;
  let fixture: ComponentFixture<HomepageNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
