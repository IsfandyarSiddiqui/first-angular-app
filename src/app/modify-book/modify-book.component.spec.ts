import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBookComponent } from './modify-book.component';

describe('ModifyBookComponent', () => {
  let component: ModifyBookComponent;
  let fixture: ComponentFixture<ModifyBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
