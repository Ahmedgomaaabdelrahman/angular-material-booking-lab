import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLabComponent } from './add-edit-lab.component';

describe('AddEditLabComponent', () => {
  let component: AddEditLabComponent;
  let fixture: ComponentFixture<AddEditLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
