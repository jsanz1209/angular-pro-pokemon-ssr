import { Component, input } from '@angular/core';
import { PokemonFormatted } from '../../interfaces/pokemon-api-response';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent {

  pokemons = input.required<PokemonFormatted[]>();
}
