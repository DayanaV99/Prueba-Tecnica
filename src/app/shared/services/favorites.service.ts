// shared/services/favorites.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../../core/models/character.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favKey = 'rm_favorites';
  private favs$ = new BehaviorSubject<Character[]>(this.load());

  getFavorites() { return this.favs$.asObservable(); }
  getValue() { return this.favs$.value; }

  private load(): Character[] {
    try { return JSON.parse(localStorage.getItem(this.favKey) || '[]'); } catch { return []; }
  }

  private save(list: Character[]) {
    localStorage.setItem(this.favKey, JSON.stringify(list));
    this.favs$.next(list);
  }

  toggleFavorite(char: Character) {
    const current = this.getValue();
    const exists = current.find(c => c.id === char.id);
    if (exists) {
      this.save(current.filter(c => c.id !== char.id));
    } else {
      this.save([...current, char]);
    }
  }

  isFavorite(id: number) {
    return !!this.getValue().find(c => c.id === id);
  }
}
