import { Component, computed, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PokemonFormatted } from '../../interfaces/pokemon-api-response';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  imports: [RouterLink],
})
export class PokemonCardComponent {

  pokemon = input.required<PokemonFormatted>();

  pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`;
  });
}
