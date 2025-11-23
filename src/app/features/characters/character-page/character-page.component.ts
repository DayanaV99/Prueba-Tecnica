import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Character } from '../../../core/models/character.model';

import { CharacterTableComponent } from '../character-table/character-table.component';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { CharacterFavoritesComponent } from '../character-favorites/character-favorites.component';
import { TotalsFooterComponent } from '../../../shared/components/totals-footer/totals-footer.component';

@Component({
  selector: 'app-character-page',
  standalone: true,
  imports: [
    CommonModule,
    CharacterTableComponent,
    CharacterDetailComponent,
    CharacterFavoritesComponent,
    TotalsFooterComponent
  ],
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.css']
})
export class CharactersPageComponent {

  selectedCharacter: Character | null = null;
  allCharacters: Character[] = [];

  onSelect(character: Character) {
    this.selectedCharacter = character;
  }

  onCharactersLoaded(characters: Character[]) {
    this.allCharacters = characters;
  }
  onSelectFavorite(char: Character) {
  this.selectedCharacter = char;
}

}
