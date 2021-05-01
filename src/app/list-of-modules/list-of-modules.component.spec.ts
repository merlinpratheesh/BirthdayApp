import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfModulesComponent } from './list-of-modules.component';

describe('ListOfModulesComponent', () => {
  let component: ListOfModulesComponent;
  let fixture: ComponentFixture<ListOfModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfModulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
