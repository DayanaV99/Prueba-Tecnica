import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RickApiRestService } from '../../../core/services/rickapi-rest.service';
import { Character } from '../../../core/models/character.model';
import { FavoritesService } from '../../../shared/services/favorites.service';

@Component({
  selector: 'app-characters-table',
  standalone: true,
  imports: [CommonModule,
  ReactiveFormsModule,],
  templateUrl: './character-table.component.html',
  styleUrls: ['./character-table.component.css']
})
export class CharacterTableComponent implements OnInit, OnDestroy {

  @Output() selected = new EventEmitter<Character>();
  @Output() charactersLoaded = new EventEmitter<Character[]>();

  searchControl = new FormControl('');
  speciesControl = new FormControl('');
  private destroy$ = new Subject<void>();

  characters: Character[] = [];
  info: any;

  constructor(
    private api: RickApiRestService,
    public favSvc: FavoritesService
  ) {}

  ngOnInit() {
    const search$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    const species$ = this.speciesControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    combineLatest([
      search$.pipe(startWith('')),
      species$.pipe(startWith(''))
    ])
      .pipe(
        switchMap(([name, species]) =>
          this.api.listCharacters({
            name: name || undefined,
            species: species || undefined
          })
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.characters = res.results ?? [];
        this.info = res.info ?? null;
        this.charactersLoaded.emit(this.characters);
      });

    this.searchControl.setValue('', { emitEvent: true });
  }

  toggleFavorite(char: Character, event?: Event) {
    if (event) event.stopPropagation();
    this.favSvc.toggleFavorite(char);
  }

  selectCharacter(char: Character) {
    this.selected.emit(char);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
