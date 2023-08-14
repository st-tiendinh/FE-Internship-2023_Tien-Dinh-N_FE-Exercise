/**
 * 9.Write a JavaScript program that creates a class `Book` with properties for title, author, and publication year. Include a method
 * to display book details. Create a subclass called 'Ebook' that inherits from the 'Book' class and includes an additional property for
 * book price. Override the display method to include the book price. Create an instance of the 'Ebook' class and display its details.
 * Represents a Book with title, author and publication year.
 * @class
 */
class Book {
  /**
   * 
   * @param {string} title - Book's title
   * @param {string} author - Book's author
   * @param {number} publicationYear - Book's publication year
   */
  constructor(title, author, publicationYear) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
  }

  /**
   * 
   * @returns {string} - Book's detail information
   */
  getBookDetail() {
    return `title: ${this.title}, author: ${this.author}, publicationYear: ${this.publicationYear}`;
  }
}

/**
 * Represents an Ebook which is also Book
 * @class
 * @extends Book
 */
class Ebook extends Book {
  /**
   * 
   * @param {string} title - Ebook's title
   * @param {string} author - Ebook's author
   * @param {number} publicationYear - Ebook's publication year
   * @param {number} price - Ebook's price
   */
  constructor(title, author, publicationYear, price) {
    super(title, author, publicationYear);
    this.price = price;
  }

  /**
   * 
   * @returns {string} - Ebook's detail information
   */
  getBookDetail() {
    return `title: ${this.title}, author: ${this.author}, publicationYear: ${this.publicationYear}, price: ${this.price}`;
  }
}

let ebook = new Ebook('Tắt đèn', 'Ngô Tất Tố', '2001', 100000);
console.log(ebook.getBookDetail());
