import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {
  @Input() image_source!: string;
  @Input() book_name!: string;
  @Input() author_name!: string;
}
