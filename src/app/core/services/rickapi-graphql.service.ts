import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CharactersApi } from './characters-api.interface';

@Injectable({ providedIn: 'root' })
export class RickApiGraphQLService implements CharactersApi {

  private url = 'https://rickandmortyapi.com/graphql';

  constructor(private http: HttpClient) {}

  listCharacters(filters: { name?: string; species?: string } = {}) {
    const query = `
      query {
        characters(filter: { name: "${filters.name ?? ''}", species: "${filters.species ?? ''}" }) {
          results {
            id
            name
            status
            species
            type
            gender
            created
            image
            origin { name url }
            location { name url }
            episode
          }
        }
      }
    `;

    return this.http.post<any>(this.url, { query }).pipe(
      map(res => ({
        results: res.data.characters.results
      }))
    );
  }
}
