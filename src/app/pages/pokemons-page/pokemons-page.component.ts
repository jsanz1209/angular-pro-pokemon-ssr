import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { PokemonListSkeletonComponent } from "../../features/pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonListComponent } from "../../features/pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonsService } from '../../features/pokemons/services/pokemons.service';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
})
export class PokemonsPageComponent {

  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _titleSrv = inject(Title);
  private _pokemonSrv = inject(PokemonsService);

  private _limitPerPage = this._pokemonSrv.limitPerPage;

  maximumPage = linkedSignal(() => {
    return Math.ceil(this._pokemonSrv.count() / this._limitPerPage);
  }).asReadonly();

  currentPage = toSignal(
    this._activatedRoute.paramMap.pipe(
      map(params => Number(params.get('page')) || 1),
      tap(page => {
        this._titleSrv.setTitle(`Pokemons - Page ${page}`);
      })
    ),
    { initialValue: 1 }
  );

  pokemosnResource = rxResource({
    params: () => ({ page: this.currentPage }),
    stream: ({ params: { page } }) => this._pokemonSrv.loadPokemons(page(), this._limitPerPage),
  });

  onPreviousPage() {
    if (this.currentPage() > 1) {
      this._router.navigate(['/pokemons/page', this.currentPage() - 1]);
      this.pokemosnResource.reload();
    }
  }

  onNextPage() {
    console.log(this.maximumPage());
    this._router.navigate(['/pokemons/page', this.currentPage() + 1]);
    this.pokemosnResource.reload();

  }

}

