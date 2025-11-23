// src/app/shared/services/favorites.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../../core/models/character.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {

  private _favorites = new BehaviorSubject<Character[]>([]);
  favorites$ = this._favorites.asObservable();

  getFavorites(): Character[] {
    return this._favorites.value;
  }

  isFavorite(id: number): boolean {
    return this._favorites.value.some(f => f.id === id);
  }

  toggleFavorite(char: Character): void {
    const list = this._favorites.value;
    const exists = this.isFavorite(char.id);

    const updated = exists
      ? list.filter(f => f.id !== char.id)
      : [...list, char];

    this._favorites.next(updated);
  }
}
