import { afterRender, Component } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookListComponent } from "../book-list/book-list.component"
import { signal } from '@angular/core';


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
	has_been_rendered: boolean = false;

	constructor(private bookService: BookService, private fb: FormBuilder) 
	{
		afterRender( () => this.has_been_rendered = true );
		this.myForm = this.fb.group({
			title: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]+")]],
			author: ['', [Validators.required, Validators.pattern("[a-zA-Z]+")]],
			description: ['', []],
		});
	}

	onSubmit() {
		this.titleValErr.set(false);
		this.authorValErr.set(false); 
		
		if (this.myForm.valid)
		{
			let max_id = document.querySelector("#invisible_helper")?.classList[0];
			const newbook: Book = new Book(
				Number(max_id),this.myForm.value.title,this.myForm.value.author,
				this.myForm.value.description, "unavailable.jpg"
			)
			this.bookService.addBook(newbook).subscribe();
			
			if(this.has_been_rendered) 
			{
				let invisible_element: HTMLButtonElement | null = document.querySelector("#invisible_helper");
				setTimeout( ()=>{}, 200);
				invisible_element?.click();
			}
		}
		else 
		{
			const title_regex = /[a-zA-Z0-9]/;
			const author_regex = /[a-zA-Z]/;
			if( this.myForm.value.title.match(title_regex) === null ) this.titleValErr.set(true);
			if( this.myForm.value.author.match(author_regex) === null ) this.authorValErr.set(true);
		}
	}
}
