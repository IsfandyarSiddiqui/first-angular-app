import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../book.model';

@Component({
	selector: 'app-search',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './search.component.html',
	styleUrl: './search.component.css'
})
export class SearchComponent {
	myForm!: FormGroup;
	idSearchErr = signal(false);
	displayBooks = signal(false);
	book?: Book;
	
	constructor(private bookService: BookService, private fb: FormBuilder) 
	{
		this.myForm = this.fb.group({
			search_id: ['', [Validators.required, Validators.pattern("[0-9]+")]], 
		});	
	}

	onSubmit() {
		if (this.myForm.valid)
		{
			this.idSearchErr.set(false);
			this.bookService.getBook(Number(this.myForm.value.search_id)).subscribe(
				data => {
					this.book = data;
				}
			);
		}
		else this.idSearchErr.set(true);
	}
}
