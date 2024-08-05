import { afterRender, Component, Input, signal } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookListComponent } from "../book-list/book-list.component"


@Component({
	selector: 'app-modify-list',
	standalone: true,
	imports: [ReactiveFormsModule, BookListComponent],
	templateUrl: './modify-list.component.html',
	styleUrl: './modify-list.component.css'
})
export class ModifyListComponent {
  	myForm!: FormGroup;
	titleValErr = signal(false);
	authorValErr = signal(false);
	idValErr = signal(false);
	has_been_rendered: boolean = false;
	@Input() add_book_bool: boolean = true;

	constructor(private bookService: BookService, private fb: FormBuilder) 
	{
		afterRender( () => this.has_been_rendered = true );
		if(this.add_book_bool)
		{
			this.myForm = this.fb.group({
				title: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]+")]],
				author: ['', [Validators.required, Validators.pattern("[a-zA-Z]+")]],
				description: ['', []],
			});	
		}
		else
		{
			this.myForm = this.fb.group({
				id: ['', [Validators.required, Validators.pattern("[0-9]+")] ],
				title: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]+")]],
				author: ['', [Validators.required, Validators.pattern("[a-zA-Z]+")]],
				description: ['', []],
			});
		}

	}

	onSubmit() {
		this.idValErr.set(false); 
		this.titleValErr.set(false);
		this.authorValErr.set(false);
		
		if (this.myForm.valid)
		{
			if(this.add_book_bool)
			{
				let max_id = document.querySelector("#invisible_helper")?.classList[0];
				const newbook: Book = new Book(
					15,this.myForm.value.title,this.myForm.value.author, //Number(max_id)
					this.myForm.value.description, "unavailable.jpg"
				);
				this.bookService.addBook(newbook).subscribe();
			}
			else
			{
				const newbook: Book = new Book(
					Number(this.myForm.value.id),this.myForm.value.title,this.myForm.value.author,
					this.myForm.value.description, "unavailable.jpg"
				);
				this.bookService.updateBook(Number(this.myForm.value.id), newbook);
			}
			
			if(this.has_been_rendered) 
			{
				let invisible_element: HTMLButtonElement | null = document.querySelector("#invisible_helper");
				setTimeout( ()=>{}, 200);
				invisible_element?.click();
			}
		}
		else 
		{
			const id_regex = /[0-9]+/;
			const title_regex = /[a-zA-Z0-9]/;
			const author_regex = /[a-zA-Z]/;
			if( this.add_book_bool && (this.myForm.value.id.match(id_regex) === null) ) this.idValErr.set(true);
			if( this.myForm.value.title.match(title_regex) === null ) this.titleValErr.set(true);
			if( this.myForm.value.author.match(author_regex) === null ) this.authorValErr.set(true);
		}
	}
}
