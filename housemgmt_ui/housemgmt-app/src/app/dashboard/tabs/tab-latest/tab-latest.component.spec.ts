import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabLatestComponent } from './tab-latest.component';

describe('TabLatestComponent', () => {
  let component: TabLatestComponent;
  let fixture: ComponentFixture<TabLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabLatestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
