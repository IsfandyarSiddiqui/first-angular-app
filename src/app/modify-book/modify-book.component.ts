import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-modify-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modify-book.component.html',
  styleUrl: './modify-book.component.css'
})
export class ModifyBookComponent {
  myForm!: FormGroup;
  titleValErr = signal(false);
  authorValErr = signal(false);
  idValErr = signal(false);
  @Output() modify_book_event = new EventEmitter<Book>();
  
  constructor(private bookService: BookService, private fb: FormBuilder)
  {
    this.myForm = this.fb.group({
	    id: ['',[Validators.required]],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', []],
    });
  }

  onSubmit() {
		this.titleValErr.set(false);
		this.authorValErr.set(false);
		this.idValErr.set(false);
		if (this.myForm.valid)
		{
        const newbook: Book = new Book(
        this.myForm.value.id,this.myForm.value.title,this.myForm.value.author, 
        this.myForm.value.description, "unavailable.jpg"
      );
      this.bookService.updateBook(this.myForm.value.id,newbook).subscribe( () => console.log(newbook) );
      this.modify_book_event.emit(newbook);
		}
		else 
		{
      if( this.myForm.value.title === "" ) this.titleValErr.set(true);
			if( this.myForm.value.author === "" ) this.authorValErr.set(true);
			if( this.myForm.value.id === "" ) this.idValErr.set(true);
		}
	}
}
