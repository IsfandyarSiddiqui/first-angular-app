import { Component, OnInit, signal } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { AddBookComponent } from '../add-book/add-book.component';
import { ModifyBookComponent } from '../modify-book/modify-book.component';

@Component({
	selector: 'app-book-list',
	standalone: true,
	imports: [AddBookComponent, ModifyBookComponent],
	templateUrl: './book-list.component.html',
	styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
	books: Book[] = [];
	max_id = signal(0);

	constructor(private bookService: BookService) { }

	ngOnInit() { this.loadBooks(); }  

	loadBooks() {
		this.bookService.getBooks().subscribe(
			data => {
				this.books = data;
				this.max_id.set(0);
				for(let book of this.books)
				{
					book.image = "Images/"+book.image;
					this.max_id.update( x => x + 1 );
				}
			}
		);
	}

	add_book($event:Book)
	{
		$event.image = "Images/"+ $event.image;
		this.books.push($event);
		this.max_id.update( x => x + 1 );
	}

	modify_book($event:Book)
	{
		$event.image = "Images/"+ $event.image;
		this.books = this.books.filter(x=>x.id!=$event.id);
		this.books.push($event);
		this.max_id.update( x => x + 1 );
	}

	deleteBook(id: number): void {
		this.bookService.deleteBook(id).subscribe(() => {
			this.loadBooks(); // Reload books after deletion
		});
	}
}
