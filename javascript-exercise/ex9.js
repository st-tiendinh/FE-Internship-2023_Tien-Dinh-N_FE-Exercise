class Book {
  constructor(title, author, publicationYear) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
  }

  getBookDetail() {
    return `title: ${this.title}, author: ${this.author}, publicationYear: ${this.publicationYear}`;
  }
}

class Ebook extends Book {
  constructor(title, author, publicationYear, price) {
    super(title, author, publicationYear);
    this.price = price;
  }

  getBookDetail() {
    return `title: ${this.title}, author: ${this.author}, publicationYear: ${this.publicationYear}, price: ${this.price}`;
  }
}

let ebook = new Ebook('Tắt đèn', 'Ngô Tất Tố', '2001', 100000);
console.log(ebook.getBookDetail());
