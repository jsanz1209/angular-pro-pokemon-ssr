import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Array.from({ length: 10 }, (_, i) => ({
        page: `${i + 1}`
      }));
    }
  },
  {
    path: 'pokemon/:name',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pokemonNameList = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then(res => res.json())
      // .then(data => data.results.map((pokemon: { name: string }) => pokemon.name));

      return pokemonNameList.results.map(({ name }: { name: string }) => ({ name }));
    }
  }
];
