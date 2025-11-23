import { Injectable, signal, computed } from '@angular/core';
import { Character } from '../../core/models/character.model';

@Injectable({ providedIn: 'root' })
export class CharactersStore {

  private charactersSignal = signal<Character[]>([]);
  private selectedSignal = signal<Character | null>(null);

  characters = computed(() => this.charactersSignal());
  selected = computed(() => this.selectedSignal());

  setCharacters(list: Character[]) {
    this.charactersSignal.set(list);
  }

  select(character: Character | null) {
    this.selectedSignal.set(character);
  }
}
