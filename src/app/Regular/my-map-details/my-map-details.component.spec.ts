import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMapDetailsComponent } from './my-map-details.component';

describe('MyMapDetailsComponent', () => {
  let component: MyMapDetailsComponent;
  let fixture: ComponentFixture<MyMapDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMapDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
