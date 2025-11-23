import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../../shared/services/favorites.service';

@Component({
  selector: 'app-character-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-favorites.component.html',
  styleUrls: ['./character-favorites.component.css']
})
export class CharacterFavoritesComponent {

  favorites$;

  constructor(public favSvc: FavoritesService) {
    this.favorites$ = this.favSvc.favorites$;
  }
}
