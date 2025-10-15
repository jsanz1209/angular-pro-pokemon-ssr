import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.addTags([
      { name: 'description', content: 'This is my about page' },
      { name: 'og:title', content: 'About page' },
      { name: 'keywords', content: 'Hola, Mundo, Fernando, Herrera, Angular Pro' }
    ]);
  }
}
