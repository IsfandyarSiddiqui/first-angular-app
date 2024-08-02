import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';

@Component({
	selector: 'app-book-list',
	standalone: true,
	imports: [ ],
	templateUrl: './book-list.component.html',
	styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
	books: Book[] = [];

	constructor(private bookService: BookService) { }

	ngOnInit (){
		this.loadBooks();
	}  

	private loadBooks() {
		console.log("Hello ");
		console.log(
		this.bookService.getBooks().subscribe(
			data => {
			this.books = data;
		}));
	}

	deleteBook(id: number): void {
		this.bookService.deleteBook(id).subscribe(() => {
			this.loadBooks(); // Reload books after deletion
		});
	}
}
