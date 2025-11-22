import { Component } from '@angular/core';
import { CharactersPageComponent } from './features/characters/character-page/character-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CharactersPageComponent
  ],
  template: '<app-character-page></app-character-page>'
})
export class AppComponent {}
