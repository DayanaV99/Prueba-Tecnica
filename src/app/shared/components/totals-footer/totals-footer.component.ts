import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../core/models/character.model';

@Component({
  selector: 'app-totals-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './totals-footer.component.html',
  styleUrls: ['./totals-footer.component.css']   // ← CAMBIADO
})
export class TotalsFooterComponent {

  @Input() characters: Character[] = [];

  get totalsBySpecies() {
    return this.countBy('species');
  }

  get totalsByType() {
    return this.countBy('type');
  }

  private countBy(field: 'species' | 'type') {
    return this.characters.reduce((acc: any, item: Character) => {
      const key = item[field] || 'unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }
}
