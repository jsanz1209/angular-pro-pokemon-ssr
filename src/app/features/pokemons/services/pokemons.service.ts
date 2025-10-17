import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PokemonAPIResponse, PokemonFormatted } from '../interfaces/pokemon-api-response';
import { PokemonDetailApiResponse } from '../interfaces/pokemon-detail';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private _httpClient = inject(HttpClient);
  count = signal<number>(0);
  limitPerPage = 20;

  loadPokemons(page: number, limit: number): Observable<PokemonFormatted[]> {
    const offset = (page - 1) * limit;
    return this._httpClient.get<PokemonAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .pipe(
        // delay(500),
        map(response => (
          this.count.set(response.count),
          response.results.map(pokemon => ({
            name: pokemon.name,
            id: pokemon.url.split('/').slice(-2, -1)[0],
          })
          ))
        )
      );
  }

  loadPokemon(name: string): Observable<PokemonDetailApiResponse> {
    return this._httpClient.get<PokemonDetailApiResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
