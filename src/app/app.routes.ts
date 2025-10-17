import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons-page/pokemons-page.component').then(c => c.PokemonsPageComponent)
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./pages/pokemon-page/pokemon-page.component').then(c => c.PokemonPageComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page.component').then(c => c.AboutPageComponent)
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing-page/pricing-page.component').then(c => c.PricingPageComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page.component').then(c => c.ContactPageComponent)
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];
