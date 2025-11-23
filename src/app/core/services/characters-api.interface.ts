import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

export interface CharactersApi {
  listCharacters(filters: { name?: string; species?: string }): Observable<any>;
  getByUrl?(url: string): Observable<any>;
}

// TOKEN REAL PARA DI
export const CHARACTERS_API = new InjectionToken<CharactersApi>('CharactersApiToken');
