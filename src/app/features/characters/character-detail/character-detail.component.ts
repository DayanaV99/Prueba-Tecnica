import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickApiRestService } from '../../../core/services/rickapi-rest.service';
import { Character } from '../../../core/models/character.model';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnChanges {

  @Input() character: Character | null = null;

  origin: any = null;
  originResident: any = null;
  location: any = null;
  locationResident: any = null;
  episode: any = null;

  constructor(private api: RickApiRestService) {}

  ngOnChanges() {
    if (!this.character) {
      this.origin = null;
      this.location = null;
      this.episode = null;
      this.originResident = null;
      this.locationResident = null;
      return;
    }

    const origin$ = this.character.origin?.url
      ? this.api.getByUrl(this.character.origin.url).pipe(catchError(() => of(null)))
      : of(null);

    const location$ = this.character.location?.url
      ? this.api.getByUrl(this.character.location.url).pipe(catchError(() => of(null)))
      : of(null);

    const episode$ = this.character.episode?.length
      ? this.api.getByUrl(this.character.episode[0]).pipe(catchError(() => of(null)))
      : of(null);

    forkJoin([origin$, location$, episode$])
      .subscribe(([originResp, locationResp, episodeResp]) => {
        this.origin = originResp;
        this.location = locationResp;
        this.episode = episodeResp;

        if (this.origin?.residents?.length) {
          this.api.getByUrl(this.origin.residents[0]).subscribe(r => this.originResident = r);
        }

        if (this.location?.residents?.length) {
          this.api.getByUrl(this.location.residents[0]).subscribe(r => this.locationResident = r);
        }
      });
  }
}
