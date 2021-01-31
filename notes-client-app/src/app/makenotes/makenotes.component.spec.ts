import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakenotesComponent } from './makenotes.component';

describe('MakenotesComponent', () => {
  let component: MakenotesComponent;
  let fixture: ComponentFixture<MakenotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakenotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakenotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
