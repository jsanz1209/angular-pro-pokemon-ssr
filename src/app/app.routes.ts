import { Routes } from '@angular/router';

export const routes: Routes = [
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
