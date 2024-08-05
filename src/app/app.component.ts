import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SectionComponent } from './section/section.component'; 
import { FeaturedComponent } from './featured/featured.component';
import {BookListComponent} from './book-list/book-list.component';
import { ModifyListComponent } from './modify-list/modify-list.component';
import { SearchComponent } from './search/search.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SectionComponent, FeaturedComponent, BookListComponent, ModifyListComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'first-angular-app';
}
