import { afterRender, Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';

// let invisble_element: HTMLElement| null = document.querySelector("#invisible_helper");
// invisble_element?.addEventListener( "click", () => this.loadBooks );
// invisble_element?.click();

@Component({
	selector: 'app-book-list',
	standalone: true,
	imports: [],
	templateUrl: './book-list.component.html',
	styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
	books: Book[] = [];
	max_id = 0;

	constructor(private bookService: BookService) 
	{
		afterRender( 
			() => { document.querySelector("#invisible_helper")?.addEventListener( "click", () => this.loadBooks() ) }
		);
	}

	ngOnInit() { this.loadBooks(); }  

	loadBooks() {
		this.max_id = 0;
		this.bookService.getBooks().subscribe(
			data => {
				this.books = data;
				for(let book of this.books)
				{
					book.image = "Images/"+book.image;
					this.max_id++;
				}
			}
		);
	}

	deleteBook(id: number): void {
		this.bookService.deleteBook(id).subscribe(() => {
			this.loadBooks(); // Reload books after deletion
		});
	}
}
