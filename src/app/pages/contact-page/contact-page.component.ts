import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
})
export class ContactPageComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.addTags([
      { name: 'description', content: 'This is my contact page' },
      { name: 'og:title', content: 'Contact page' },
      { name: 'keywords', content: 'Hola, Mundo, Fernando, Herrera, Angular Pro' }
    ]);
  }
}
