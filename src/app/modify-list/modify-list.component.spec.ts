import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyListComponent } from './modify-list.component';

describe('ModifyListComponent', () => {
  let component: ModifyListComponent;
  let fixture: ComponentFixture<ModifyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
