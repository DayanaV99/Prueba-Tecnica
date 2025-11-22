import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFavoritesComponent } from './character-favorites.component';

describe('CharacterFavoritesComponent', () => {
  let component: CharacterFavoritesComponent;
  let fixture: ComponentFixture<CharacterFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
