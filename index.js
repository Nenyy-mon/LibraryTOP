const popup = document.getElementById("popup");
const grid = document.getElementById("books");
const myForm = document.getElementById("form");
const titleName = document.getElementById("titleName");
const authorName = document.getElementById("authorName");
const pagesNum = document.getElementById("pagesNum");
const inputs = document.getElementsByClassName("readLab");
let readIt = document.getElementById("readit");

const myLibrary = [];

function Book(title, author, pages, readIt = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readIt = readIt;
}

function addBookToLibrary() {
    event.preventDefault();
    let newBook = new Book(
        titleName.value,
        authorName.value,
        pagesNum.value,
        readIt.checked  // Use the checkbox value to determine if the book has been read
    );
    myLibrary.push(newBook);
    displayBook();
    removePop();
}

function displayBook() {
    grid.innerHTML = myLibrary
        .map(
            (book, index) => `
        <div class="book" id="book${index}">
            <h3 class="title" id="title${index}">${book.title}</h3>
            <h5 class="author" id="author${index}">by: ${book.author}</h5>
            <h6 class="pages" id="pages${index}">pages: ${book.pages}</h6>
            <label class="readab" id="readab" for="readLab${index}">
			Have you read this book?
                <input type="checkbox" ${book.readIt ? 'checked' : ''} class="readLab" id="readLab${index}" name="read" />

				</label>
            <button onclick="deleteBook(event)" class="dltBtn" id="dltBtn${index}">Delete this book</button>
        </div>
    `
        )
        .join("");
    console.log(myLibrary);
}

function showPopup() {
    popup.classList.add("active");
    document.body.classList.add("noscroll");
}

function removePop() {
    popup.classList.remove("active");
    document.body.classList.remove("noscroll");
}

function deleteBook(event) {
    let idnum = event.target.parentElement.id;
    let idNumArr = idnum.split("");
    let idnumChar = idNumArr.splice(4);
    let id = idnumChar[0];
    let index = myLibrary.findIndex((book, i) => i == id);
    myLibrary.splice(index, 1);
    event.target.parentElement.remove();
    displayBook();
}
