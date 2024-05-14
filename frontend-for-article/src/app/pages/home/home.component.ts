import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  booksData: any[] = [];

  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.getAllBooks()
  }

  getAllBooks(): void {
    this.bookService.getAllBooks()
      .subscribe(books => {
        this.booksData = books.map(book => {
          // Add a property to control whether the full description is shown
          book.showFullDescription = false;
          return book;
        });
        console.log("Total Books Fetched:", this.booksData);
      });
  }

  isLongDescription(description: string | undefined): boolean {
    // console.log("description", description)
    return !!description && description.length > 200; // Adjust the threshold as needed
  }

  toggleDescription(book: any): void {
    console.log("book toggled", book)
    book.showFullDescription = !book.showFullDescription;
  }
}
