import { CharactersApi } from './characters-api.interface';
import { RickApiRestService } from './rickapi-rest.service';
import { RickApiGraphQLService } from './rickapi-graphql.service';

export const API_PROVIDERS = {
  rest: RickApiRestService,
  graphql: RickApiGraphQLService
};
