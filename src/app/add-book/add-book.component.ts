import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  @Input({required:true}) curr_max_id!:number;
  myForm!: FormGroup;
  titleValErr = signal(false);
	authorValErr = signal(false);
  @Output() book_added_event = new EventEmitter<Book>();
  
  constructor(private bookService: BookService, private fb: FormBuilder)
  {
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', []],
    });
  }

  onSubmit() {
		this.titleValErr.set(false);
		this.authorValErr.set(false);
		if (this.myForm.valid)
		{
      const newbook: Book = new Book(
        this.curr_max_id,this.myForm.value.title,this.myForm.value.author, //Number(max_id)
        this.myForm.value.description, "unavailable.jpg"
      );
      this.bookService.addBook(newbook).subscribe( () => console.log(newbook) );
      this.book_added_event.emit(newbook);
		}
		else 
		{
			if( this.myForm.value.title === "" ) this.titleValErr.set(true);
			if( this.myForm.value.author === "" ) this.authorValErr.set(true);
		}
	}
}
