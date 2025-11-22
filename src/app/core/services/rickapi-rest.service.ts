// src/app/core/services/rickapi-rest.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../models/character.model';

@Injectable({ providedIn: 'root' })
export class RickApiRestService {
  private base = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  // List characters with optional filters (name, status, species, etc.)
  listCharacters(filters: { name?: string; species?: string; status?: string; page?: number } = {}): Observable<any> {
    let params = new HttpParams();
    if (filters.name) params = params.set('name', filters.name);
    if (filters.species) params = params.set('species', filters.species);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.page) params = params.set('page', String(filters.page));
    return this.http.get(`${this.base}/character`, { params });
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.base}/character/${id}`);
  }

  // Obtener recurso por URL (location, origin, episode)
  getByUrl<T = any>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  // Ejemplo: carga concurrente (origin, location, first episode)
  getCharacterDetails(character: Character) {
    const origin$ = character.origin?.url ? this.getByUrl(character.origin.url) : null;
    const location$ = character.location?.url ? this.getByUrl(character.location.url) : null;
    const episodeUrl = character.episode && character.episode.length ? character.episode[0] : null;
    const episode$ = episodeUrl ? this.getByUrl(episodeUrl) : null;

    // Usar forkJoin sólo con observables existentes
    const calls = [];
    if (origin$) calls.push(origin$);
    if (location$) calls.push(location$);
    if (episode$) calls.push(episode$);

    return calls.length ? forkJoin(calls) : null;
  }
}
