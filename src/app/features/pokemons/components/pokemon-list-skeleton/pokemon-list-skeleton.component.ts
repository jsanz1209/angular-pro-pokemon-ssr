import { Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-list-skeleton',
  imports: [],
  templateUrl: './pokemon-list-skeleton.component.html',
})
export class PokemonListSkeletonComponent {

  pokemonListNumeric = Array.from({ length: 20 }, (_, i) => i + 1);

}
