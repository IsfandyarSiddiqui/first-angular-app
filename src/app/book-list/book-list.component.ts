import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-book-list',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './book-list.component.html',
	styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
	books: Book[] = [];
	myForm!: FormGroup;

	constructor(private bookService: BookService, private fb: FormBuilder) 
	{
		this.myForm = this.fb.group({
			title: ['', [Validators.required]],
			author: ['', [Validators.required]],
			description: ['', []],
		});
	}

	onSubmit() {
		if (this.myForm.valid)
		{
			console.log(this.myForm.value);
			this.bookService.addBook(
				new Book(
					100,this.myForm.value.title,this.myForm.value.author,
					this.myForm.value.description, "unavailable.jpg"
				) 
			)	
		}
	}

	ngOnInit(){
		this.loadBooks();
	}  

	private loadBooks() {
		this.bookService.getBooks().subscribe(
			data => {
				this.books = data;
				this.books.forEach(book=>book.image = "Images/"+book.image
				)
			}
		);
	}

	deleteBook(id: number): void {
		this.bookService.deleteBook(id).subscribe(() => {
			this.loadBooks(); // Reload books after deletion
		});
	}
}
