import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html'
})
export class PricingPageComponent {
  private title = inject(Title);
  private meta = inject(Meta);
  private platformID = inject(PLATFORM_ID);

  ngOnInit(): void {
    console.log('Hola mundo');

    // if (isPlatformBrowser(this.platformID)) {
    //   document.title = 'Pricing page';
    // }

    this.title.setTitle('Pricing Page');
    this.meta.addTags([
      { name: 'description', content: 'This is my pricing page' },
      { name: 'og:title', content: 'Pricing page' },
      { name: 'keywords', content: 'Hola, Mundo, Fernando, Herrera, Angular Pro' }
    ]);
  }
}
