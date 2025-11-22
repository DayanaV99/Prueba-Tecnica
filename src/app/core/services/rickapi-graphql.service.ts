import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RickApiGraphqlService {
  constructor(private apollo: Apollo) {}

  getCharacters(): Observable<any> {
    return this.apollo
      .query({
        query: gql`
          query {
            characters {
              results {
                id
                name
                status
                species
                type
                gender
                image
              }
            }
          }
        `
      })
      .pipe(map((result: any) => result.data?.characters?.results || []));
  }

  // Add more GraphQL queries as needed
}
