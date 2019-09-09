import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsHomePage } from './tabs-home.page';

describe('TabsHomePage', () => {
  let component: TabsHomePage;
  let fixture: ComponentFixture<TabsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
