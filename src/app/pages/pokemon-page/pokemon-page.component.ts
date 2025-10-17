import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, tap } from 'rxjs';
import { PokemonDetailApiResponse } from '../../features/pokemons/interfaces/pokemon-detail';
import { PokemonsService } from '../../features/pokemons/services/pokemons.service';

@Component({
  selector: 'app-pokemon-page',
  imports: [TitleCasePipe],
  templateUrl: './pokemon-page.component.html',
})
export class PokemonPageComponent {

  private _pokemonSrv = inject(PokemonsService);
  private _activatedRoute = inject(ActivatedRoute);
  private _titleSrv = inject(Title);
  private _metaSrv = inject(Meta);

  private name = toSignal(
    this._activatedRoute.paramMap.pipe(
      map(params => {
        const name = params.get('name');
        return name;
      })
    ),
    { initialValue: '' }
  );

  pokemonResource = rxResource({
    params: () => ({ name: this.name() }),
    stream: ({ params: { name } }) => {
      if (name === null) {
        return EMPTY;
      }
      return this._pokemonSrv.loadPokemon(name).pipe(tap(response => {
        this.updateTitleAndMeta(response);
      }));
    }
  });

  private updateTitleAndMeta(response: PokemonDetailApiResponse) {
    this._titleSrv.setTitle(new TitleCasePipe().transform(response.name));
    this._metaSrv.updateTag({ name: 'description', content: `Details about the Pokemon ${response.name}` });
    this._metaSrv.updateTag({ name: 'og:title', content: `Pokemon: ${response.name}` });
    this._metaSrv.updateTag({ name: 'og:description', content: `Details about the Pokemon ${response.name}` });
    this._metaSrv.updateTag({ name: 'twitter:title', content: `Pokemon: ${response.name}` });
    this._metaSrv.updateTag({ name: 'twitter:description', content: `Details about the Pokemon ${response.name}` });
    this._metaSrv.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png` });
    this._metaSrv.updateTag({ name: 'twitter:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png` });
  }
}
